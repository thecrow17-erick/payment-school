/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationDto } from 'core/dto';
import { ApiResponse, PaginatedResult } from 'core/interface';
import { AcademicYear } from 'database/entities';
import { AcademicYearService } from 'feature/academic-year/bussiness/services';
import { CreateAcademicYearDto, UpdateAcademicYearDto } from '../dto';

@Controller('academic-years')
export class AcademicYearController { 
  constructor(
    private readonly academicYearService: AcademicYearService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  public async findAll(@Query() paginationDto: PaginationDto): Promise<ApiResponse<PaginatedResult<AcademicYear>>> {
    return {
      message: "Lista de años académicos",
      data: await this.academicYearService.findAll(paginationDto)
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  public async findOne(@Param('id') id: number): Promise<ApiResponse<AcademicYear | null>> {
    return {
      message: "Año académico encontrado",
      data: await this.academicYearService.findOne(id)
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createAcademicYear(@Body() createAcademicYearDto: CreateAcademicYearDto): Promise<ApiResponse<AcademicYear>> {
    return {
      message: "Año académico creado",
      data: await this.academicYearService.createAcademicYear(createAcademicYearDto)
    }
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  public async updateAcademicYear(@Param('id') id: number, @Body() updateAcademicYearDto: UpdateAcademicYearDto): Promise<ApiResponse<AcademicYear>> {
    return {
      message: "Año académico actualizado",
      data: await this.academicYearService.updateAcademicYear(id, updateAcademicYearDto)
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  public async deleteAcademicYear(@Param('id') id: number): Promise<ApiResponse<AcademicYear>> {
    const academicYear = await this.academicYearService.deleteAcademicYear(id);
    return {
      message: `Año académico ${academicYear?.isActive ? 'desactivado' : 'activado'}`,
      data: academicYear
    }
  }

}
