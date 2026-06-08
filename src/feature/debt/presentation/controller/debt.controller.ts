/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Query, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { PaginationDto } from 'core/dto';
import { ApiResponse, PaginatedResult } from 'core/interface';
import { Debt } from 'database/entities';
import { type Request } from 'express';
import { FatherSignInGuard } from 'feature/auth/presentation/guard';
import { DebtService } from 'feature/debt/bussiness/services';
import { firstValueFrom } from 'rxjs';

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

  // @HttpCode(HttpStatus.OK)
  // @Get('/:id')
  // public async getDebtById(
  // ): Promise<ApiResponse<any>> {
  //   const payload = { id: 1, name: "Eirck uwu" };
  //   console.log('Enviando mensaje al ERP con payload:', payload);
  //   // ENVIAR SOLO EL ID (Primitivo)
  //   const response = await firstValueFrom(
  //     this.client.send('handlePaymentTest', payload)
  //   );
  //    console.log('Respuesta recibida del ERP:', response);
  //   return {
  //     data: response,
  //     message: 'Debt retrieved successfully',
  //   };
  // }
}
