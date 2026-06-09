import { PaginationDto } from "core/dto";
import { PaginatedResult } from "core/interface";
import { Payment } from "database/entities/payment.entity";
import { PaymentDetail } from "database/entities/payment-detail.entity";


export interface IPaymentRepository {
  findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Payment>>;
  findById(id: number): Promise<Payment | null>;
  create(payment: Payment, details: PaymentDetail[]): Promise<Payment>;
}
