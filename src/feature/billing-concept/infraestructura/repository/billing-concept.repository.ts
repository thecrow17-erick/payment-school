import { Injectable } from "@nestjs/common";
import { IBillingConceptRepository } from "../interface";
import { InjectRepository } from "@nestjs/typeorm";
import { BillingConcept } from "database/entities";
import { Repository } from "typeorm";
import { PaginationDto } from "core/dto";
import { PaginatedResult } from "core/interface";
import { paginate } from "core/util/paginate.util";


@Injectable()
export class BillingConceptRepository implements IBillingConceptRepository {
  constructor(
    @InjectRepository(BillingConcept)
    private readonly repository: Repository<BillingConcept>
  ){}

  public async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<BillingConcept>> {
    const queryBuilder = this.repository.createQueryBuilder('billing_concept');
    if (paginationDto.search) {
      const searchPattern = `%${paginationDto.search}%`;
      queryBuilder.where(
        '(billing_concept.name ILIKE :search OR billing_concept.description ILIKE :search)',
        { search: searchPattern }
      );
    }
    return await paginate(queryBuilder, paginationDto);
  }

  public async findById(id: number): Promise<BillingConcept | null> {
    return await this.repository.findOne({ where: { id } });
  }

  public async create(data: BillingConcept): Promise<BillingConcept> {
    const billingConcept = this.repository.create(data);
    return await this.repository.save(billingConcept);
  }

  public async update(data: BillingConcept): Promise<BillingConcept> {
    return await this.repository.save(data);
  }
  public async findByNameAndAcademicPeriod(name: string, academicPeriodId: number): Promise<BillingConcept | null> {
    return await this.repository.findOne({ where: 
      { 
        name, 
        academicYear: {
          id: academicPeriodId
        }
      } 
    });
  }
}