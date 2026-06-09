/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PaginationDto } from 'core/dto';
import { ApiResponse, PaginatedResult } from 'core/interface';
import { PaymentMethod } from 'database/entities';
import { PaymentMethodService } from 'feature/payment/bussiness/services';
import { CreatePaymentMethodDto, UpdatePaymentMethodDto } from '../dto';

@Controller('payment-method')
export class PaymentMethodController { 
  constructor(
    private readonly paymentMethodService: PaymentMethodService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  public async findAll(@Query() paginationDto: PaginationDto): Promise<ApiResponse<PaginatedResult<PaymentMethod>>> {
    const result = await this.paymentMethodService.findAll(paginationDto);
    return {
      data: result,
      message: 'Payment methods retrieved successfully',
    }; 
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  public async findById(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<PaymentMethod | null>> {
    const result = await this.paymentMethodService.findById(id);
    return {
      data: result,
      message: 'Payment method retrieved successfully',
    }; 
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createPaymentMethod(@Body() createPaymentMethodDto: CreatePaymentMethodDto): Promise<ApiResponse<PaymentMethod>> {
    const result = await this.paymentMethodService.createPaymentMethod(createPaymentMethodDto);
    return {
      data: result,
      message: 'Payment method created successfully',
    };
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  public async updatePaymentMethod(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto
  ): Promise<ApiResponse<PaymentMethod>> {
    const result = await this.paymentMethodService.updatePaymentMethod(id, updatePaymentMethodDto);
    return {
      data: result,
      message: 'Payment method updated successfully',
    };
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  public async deletePaymentMethod(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<PaymentMethod>> {
    const result = await this.paymentMethodService.deletePaymentMethod(id);
    return {
      data: result,
      message: `Payment method ${result.isActive ? 'activated' : 'deactivated'} successfully`,
    };
  }
}
