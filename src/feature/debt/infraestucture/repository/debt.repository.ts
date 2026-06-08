import { Injectable } from "@nestjs/common";
import { DebtRepositoryInterface } from "../interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Debt, DebtDetail } from "database/entities";
import { Repository } from "typeorm";
import { PaginationDto } from "core/dto";
import { PaginatedResult } from "core/interface";
import { paginate } from "core/util/paginate.util";



@Injectable()
export class DebtRepository implements DebtRepositoryInterface {
  constructor(
    @InjectRepository(Debt)
    private readonly repository: Repository<Debt>,
  ) {}

  public async findAllDebts(paginationDto: PaginationDto, fatherId: number): Promise<PaginatedResult<Debt>> {
    const queryBuilder = this.repository.createQueryBuilder('debt');
    queryBuilder.innerJoinAndSelect('debt.employee', 'employee');
    queryBuilder.innerJoinAndSelect('debt.details', 'detail');
    queryBuilder.innerJoinAndSelect('detail.student', 'student');
    queryBuilder.innerJoinAndSelect('detail.concept', 'concept');
    queryBuilder.where('student.father_id = :fatherId', { fatherId });
    if (paginationDto.search) {
      const search = `%${paginationDto.search}%`;
      queryBuilder.andWhere('debt.description ILIKE :search', { search });
    }    
    if(paginationDto.startDate){
      queryBuilder.andWhere('debt.due_date >= :startDate', { startDate: paginationDto.startDate });
    }
    if(paginationDto.endDate){
      queryBuilder.andWhere('debt.due_date <= :endDate', { endDate: paginationDto.endDate });
    }
    return await paginate(queryBuilder, paginationDto);
  }

  public async findDebtById(id: number): Promise<Debt | null> {
    return await this.repository.findOne({ 
      where: { id },
      select: {
        details: true,
      }
    });
  }

  public async createDebt(debt: Debt): Promise<Debt> {
    return await this.repository.manager.transaction(async (entityManager) => {
      const savedDebt = await entityManager.save(Debt, debt);
      if (debt.details && debt.details.length > 0) {
        for (const detail of debt.details) {
          detail.debt = savedDebt;
        }
        const savedDetails = await entityManager.save(DebtDetail, debt.details);
        // Remove circular back-reference before returning
        savedDebt.details = savedDetails.map((detail) => {
          delete (detail as any).debt;
          return detail;
        });
      }
      return savedDebt;
    });
  }

  public async updateDebt(debt: Debt): Promise<Debt> {
    return await this.repository.save(debt);
  }

}