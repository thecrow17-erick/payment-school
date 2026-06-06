import { PaginationDto } from "core/dto";
import { PaginatedResult } from "core/interface";
import { BillingConcept } from "database/entities/billing-concept.entity";


export interface IBillingConceptRepository {
  findAll(paginationDto: PaginationDto): Promise<PaginatedResult<BillingConcept>>;
  findById(id: number): Promise<BillingConcept | null>;
  findByNameAndAcademicPeriod(name: string, academicPeriodId: number): Promise<BillingConcept | null>;
  create(data: BillingConcept): Promise<BillingConcept>;
  update(data: BillingConcept): Promise<BillingConcept>;

}