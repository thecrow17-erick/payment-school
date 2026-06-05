/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiResponse, PaginatedResult } from '@core/interface';
import { Father } from '@database/entities';
import { FatherService } from 'feature/father/Bussines/service';
import { PaginationDto } from '@core/dto';

@Controller('father')
export class FatherController {

  constructor(
    private readonly fatherService: FatherService
  ){}

  @HttpCode(HttpStatus.OK)
  @Get()
  public async findAll(@Query() paginationDto: PaginationDto): Promise<ApiResponse<PaginatedResult<Father>>> {
    return {
      message: 'Padres obtenidos con éxito',
      data: await this.fatherService.findAll(paginationDto)
    }
  }
}
