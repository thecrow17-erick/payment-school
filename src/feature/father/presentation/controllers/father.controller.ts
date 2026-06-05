/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse, PaginatedResult } from '@core/interface';
import { Father } from '@database/entities';
import { FatherService } from 'feature/father/Bussines/service';
import { PaginationDto } from '@core/dto';
import { CreateFatherDto, UpdateFatherDto } from '../dto';

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

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  public async findOne(@Param('id') id: number): Promise<ApiResponse<Father | null>> {
    return {
      message: 'Padre obtenido con éxito',
      data: await this.fatherService.findOne(id) 
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createFather(@Body() father: CreateFatherDto): Promise<ApiResponse<Father>> {
    return {
      message: 'Padre creado con éxito',
      data: await this.fatherService.createFather(father)
    }
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  public async updateFather(@Param('id') id: number, @Body() father: UpdateFatherDto): Promise<ApiResponse<Father>> {
    return {
      message: 'Padre actualizado con éxito',
      data: await this.fatherService.updateFather(id, father)
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  public async deleteFather(@Param('id') id: number): Promise<ApiResponse<Father>> {
    const father = await this.fatherService.deleteFather(id);
    return {
      message: `Padre ${father.isActive ? 'activado' : 'desactivado'} con éxito`,
      data: father // Este método debe ser implementado en el servicio
    }
  }

}
