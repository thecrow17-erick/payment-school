import { Injectable } from "@nestjs/common";
import { DebtRepositoryInterface } from "../interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Debt } from "database/entities";
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
    queryBuilder.innerJoinAndSelect('debt_detail', 'detail', 'detail.debt_id = debt.id');
    queryBuilder.innerJoin('students', 'student', 'student.id = detail.student_id');
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

}