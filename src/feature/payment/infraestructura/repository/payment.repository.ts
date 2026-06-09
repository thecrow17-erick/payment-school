import { Injectable } from "@nestjs/common";
import { IPaymentRepository } from "../interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment, PaymentDetail } from "database/entities";
import { DataSource, Repository } from "typeorm";
import { PaginationDto } from "core/dto";
import { PaginatedResult } from "core/interface";
import { paginate } from "core/util/paginate.util";


@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(PaymentDetail)
    private readonly paymentDetailRepo: Repository<PaymentDetail>,
    private readonly dataSource: DataSource,
  ){}

  public async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Payment>> {
    const queryBuilder = this.paymentRepo.createQueryBuilder('payment')
      .leftJoinAndSelect('payment.paymentMethod', 'paymentMethod')
      .leftJoinAndSelect('payment.paymentDetails', 'paymentDetails')
      .leftJoinAndSelect('paymentDetails.concept', 'concept')
      .leftJoinAndSelect('paymentDetails.debtDetail', 'debtDetail');

    if (paginationDto.search) {
      const searchPattern = `%${paginationDto.search}%`;
      queryBuilder.where(
        '(payment.description ILIKE :search OR payment.transaction_id ILIKE :search)',
        { search: searchPattern }
      );
    }
    return await paginate(queryBuilder, paginationDto);
  }

  public async findById(id: number): Promise<Payment | null> {
    return await this.paymentRepo.findOne({ 
      where: { id },
      //relations: ['paymentMethod', 'paymentDetails', 'paymentDetails.concept', 'paymentDetails.debtDetail'],
    });
  }

  public async create(payment: Payment, details: PaymentDetail[]): Promise<Payment> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const savedPayment = await queryRunner.manager.save(Payment, payment);
      for (const detail of details) {
        detail.payment = savedPayment;
        await queryRunner.manager.save(PaymentDetail, detail);
      }
      await queryRunner.commitTransaction();
      return await this.findById(savedPayment.id) as Payment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
