import { PaginationDto } from "core/dto";
import { PaginatedResult } from "core/interface";
import { PaymentMethod } from "database/entities/payment-method.entity";


export interface IPaymentMethodRepository {
  findAll(paginationDto: PaginationDto): Promise<PaginatedResult<PaymentMethod>>;
  findById(id: number): Promise<PaymentMethod | null>;
  findByCode(code: string): Promise<PaymentMethod | null>;
  create(data: PaymentMethod): Promise<PaymentMethod>;
  update(data: PaymentMethod): Promise<PaymentMethod>;
}
