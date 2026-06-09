/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'core/dto';
import { PaginatedResult } from 'core/interface';
import { PaymentMethod } from 'database/entities';
import { PaymentMethodRepository } from 'feature/payment/infraestructura/repository';
import { CreatePaymentMethodDto, UpdatePaymentMethodDto } from 'feature/payment/presentation/dto';

@Injectable()
export class PaymentMethodService { 

  constructor(
    private readonly paymentMethodRepository: PaymentMethodRepository,
  ){}

  public async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<PaymentMethod>> {
    return await this.paymentMethodRepository.findAll(paginationDto);
  }

  public async findById(id: number): Promise<PaymentMethod | null> {
    const findId = await this.paymentMethodRepository.findById(id);
    if (!findId) {
      throw new NotFoundException(`Método de pago con id ${id} no encontrado`);
    }
    return findId;
  }

  public async createPaymentMethod(createPaymentMethodDto: CreatePaymentMethodDto): Promise<PaymentMethod> {
    const findByCode = await this.paymentMethodRepository.findByCode(createPaymentMethodDto.code);
    if (findByCode) {
      throw new BadRequestException(`Método de pago con código ${createPaymentMethodDto.code} ya existe`);
    }
    const paymentMethod = new PaymentMethod();
    paymentMethod.code = createPaymentMethodDto.code;
    paymentMethod.description = createPaymentMethodDto.description;
    return await this.paymentMethodRepository.create(paymentMethod);
  }
  
  public async updatePaymentMethod(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto): Promise<PaymentMethod> {
    const paymentMethod = await this.findById(id);
    if (!paymentMethod) {
      throw new NotFoundException(`Método de pago con id ${id} no encontrado`);
    }
    if (updatePaymentMethodDto.code !== undefined) {
      const findByCode = await this.paymentMethodRepository.findByCode(updatePaymentMethodDto.code);
      if (findByCode && findByCode.id !== paymentMethod.id) {
        throw new BadRequestException(`Método de pago con código ${updatePaymentMethodDto.code} ya existe`);
      }
      paymentMethod.code = updatePaymentMethodDto.code;
    }
    if (updatePaymentMethodDto.description !== undefined) {
      paymentMethod.description = updatePaymentMethodDto.description;
    }
    return await this.paymentMethodRepository.update(paymentMethod);
  }

  public async deletePaymentMethod(id: number): Promise<PaymentMethod> {
    const paymentMethod = await this.findById(id);
    if (!paymentMethod) {
      throw new NotFoundException(`Método de pago con id ${id} no encontrado`);
    }
    paymentMethod.isActive = !paymentMethod.isActive;
    return await this.paymentMethodRepository.update(paymentMethod);
  }
}
