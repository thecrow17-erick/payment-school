import { Injectable } from "@nestjs/common";
import { IPaymentMethodRepository } from "../interface";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentMethod } from "database/entities";
import { Repository } from "typeorm";
import { PaginationDto } from "core/dto";
import { PaginatedResult } from "core/interface";
import { paginate } from "core/util/paginate.util";


@Injectable()
export class PaymentMethodRepository implements IPaymentMethodRepository {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly repository: Repository<PaymentMethod>
  ){}

  public async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<PaymentMethod>> {
    const queryBuilder = this.repository.createQueryBuilder('payment_method');
    if (paginationDto.search) {
      const searchPattern = `%${paginationDto.search}%`;
      queryBuilder.where(
        '(payment_method.code ILIKE :search OR payment_method.description ILIKE :search)',
        { search: searchPattern }
      );
    }
    return await paginate(queryBuilder, paginationDto);
  }

  public async findById(id: number): Promise<PaymentMethod | null> {
    return await this.repository.findOne({ where: { id } });
  }

  public async findByCode(code: string): Promise<PaymentMethod | null> {
    return await this.repository.findOne({ where: { code } });
  }

  public async create(data: PaymentMethod): Promise<PaymentMethod> {
    const paymentMethod = this.repository.create(data);
    return await this.repository.save(paymentMethod);
  }

  public async update(data: PaymentMethod): Promise<PaymentMethod> {
    return await this.repository.save(data);
  }
}
