/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PaginationDto } from 'core/dto';
import { ApiResponse, PaginatedResult } from 'core/interface';
import { BillingConcept } from 'database/entities';
import { BillingConceptService } from 'feature/billing-concept/bussiness/services';
import { CreateBillingConceptDto, UpdateBillingConceptDto } from '../dto';

@Controller('billing-concept')
export class BillingConceptController { 
  constructor(
    private readonly billingConceptService: BillingConceptService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  public async findAll(@Query() paginationDto: PaginationDto): Promise<ApiResponse<PaginatedResult<BillingConcept>>> {
    const result = await this.billingConceptService.findAll(paginationDto);
    return {
      data: result,
      message: 'Billing concepts retrieved successfully',
    }; 
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  public async findById(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<BillingConcept | null>> {
    const result = await this.billingConceptService.findById(id);
    return {
      data: result,
      message: 'Billing concept retrieved successfully',
    }; 
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createBillingConcept(@Body() createBillingConceptDto: CreateBillingConceptDto): Promise<ApiResponse<BillingConcept>> {
    const result = await this.billingConceptService.createBillingConcept(createBillingConceptDto);
    return {
      data: result,
      message: 'Billing concept created successfully',
    };
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  public async updateBillingConcept(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBillingConceptDto: UpdateBillingConceptDto
  ): Promise<ApiResponse<BillingConcept>> {
    const result = await this.billingConceptService.updateBillingConcept(id, updateBillingConceptDto);
    return {
      data: result,
      message: 'Billing concept updated successfully',
    };
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  public async deleteBillingConcept(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<BillingConcept>> {
    const result = await this.billingConceptService.deleteBillingConcept(id);
    return {
      data: result,
      message: `Billing concept ${result.isActive ? 'activated' : 'deactivated'} successfully`,
    };
  }
}
