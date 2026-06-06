/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginationDto } from 'core/dto';
import { AcademicYear } from 'database/entities';
import { AcademicYearRepository } from 'feature/academic-year/infraestructure/repository';
import { CreateAcademicYearDto, UpdateAcademicYearDto } from 'feature/academic-year/presentation/dto';

@Injectable()
export class AcademicYearService { 
  constructor(
    private readonly academicYearRepository: AcademicYearRepository
  ) {}

  public async findAll(paginationDto: PaginationDto) {
    return this.academicYearRepository.findAll(paginationDto);  
  }

  public async findOne(id: number) {
    return this.academicYearRepository.findById(id);  
  }

  public async createAcademicYear(createAcademicYearDto: CreateAcademicYearDto) {
    const findByCode = await this.academicYearRepository.findByCode(createAcademicYearDto.code);
    if (findByCode) {
      throw new BadRequestException('El código del año académico ya existe');
    }
    const academicYear = new AcademicYear();
    academicYear.code = createAcademicYearDto.code;
    academicYear.startDate = new Date(createAcademicYearDto.startDate);
    academicYear.endDate = new Date(createAcademicYearDto.endDate);
    return this.academicYearRepository.createAcademicYear(academicYear);
  } 

  public async updateAcademicYear(id: number, updateAcademicYearDto: UpdateAcademicYearDto) {
    const academicYear = await this.academicYearRepository.findById(id);
    if (!academicYear) {
      throw new BadRequestException('El año académico no existe');
    }
    const findByCode = await this.academicYearRepository.findByCode(updateAcademicYearDto.code!);
    if (findByCode && findByCode.id !== id) {
      throw new BadRequestException('El código del año académico ya existe');
    }
    academicYear.code = updateAcademicYearDto.code ?? academicYear.code;
    academicYear.startDate = updateAcademicYearDto.startDate ? new Date(updateAcademicYearDto.startDate) : academicYear.startDate;
    academicYear.endDate = updateAcademicYearDto.endDate ? new Date(updateAcademicYearDto.endDate) : academicYear.endDate;
    return this.academicYearRepository.updateAcademicYear(academicYear);
  }

  public async deleteAcademicYear(id: number) {
    const academicYear = await this.academicYearRepository.findById(id);
    if (!academicYear) {
      throw new BadRequestException('El año académico no existe');
    }
    academicYear.isActive = !academicYear.isActive;
    return this.academicYearRepository.updateAcademicYear(academicYear);
  }
}
