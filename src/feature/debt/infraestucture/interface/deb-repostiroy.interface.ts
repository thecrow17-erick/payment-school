import { PaginationDto } from "core/dto";
import { PaginatedResult } from "core/interface";
import { Debt } from "database/entities";



export interface DebtRepositoryInterface {
  findAllDebts(paginationDto: PaginationDto, fatherId: number): Promise<PaginatedResult<Debt>>;
  findDebtById(id: number): Promise<Debt | null>;
}