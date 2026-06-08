/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { DebtRepository } from 'feature/debt/infraestucture/repository';

@Injectable()
export class DebtService { 

  constructor(
    private readonly debtRepository: DebtRepository
  ) {}

  public async getAllDebts(paginationDto, fatherId: number) {
    return await this.debtRepository.findAllDebts(paginationDto, fatherId);
  }
}
