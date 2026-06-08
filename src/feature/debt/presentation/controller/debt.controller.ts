/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { PaginationDto } from 'core/dto';
import { ApiResponse, PaginatedResult } from 'core/interface';
import { Debt } from 'database/entities';
import { type Request } from 'express';
import { EmployeeAuthGuard, FatherSignInGuard } from 'feature/auth/presentation/guard';
import { DebtService } from 'feature/debt/bussiness/services';
import { CreateDebtDto } from '../dto';

@Controller('debt')
export class DebtController { 

  constructor(
    private readonly debtService: DebtService,
  ) {}



  @HttpCode(HttpStatus.OK)
  @UseGuards(FatherSignInGuard)
  @Get('/father')
  public async getAllDebts(
    @Query() paginationDto: PaginationDto,
    @Req() req: Request
  ): Promise<ApiResponse<PaginatedResult<Debt>>> {
    const fatherId = req.fatherId!;
    const debts = await this.debtService.getAllDebts(paginationDto, fatherId);
    return {
      data: debts,
      message: 'Debts retrieved successfully',
    };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(EmployeeAuthGuard)
  public async createDebt(
    @Req() req: Request,
    @Body() createDebtDto: CreateDebtDto
  ): Promise<ApiResponse<Debt>> {
    const employeeId = req.employeeId!;
    const debt = await this.debtService.createDebt(employeeId, createDebtDto);
    return {
      data: debt,
      message: 'Debt created successfully',
    };
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/cancel/:debtId')
  @UseGuards(EmployeeAuthGuard)
  public async cancelDebt(
    @Param('debtId', ParseIntPipe) debtId: number,
  ): Promise<ApiResponse<Debt>> {
    const debt = await this.debtService.cancelDebt(debtId);
    return {
      data: debt,
      message: 'Deuda cancelada exitosamente',
    };
  }
}
