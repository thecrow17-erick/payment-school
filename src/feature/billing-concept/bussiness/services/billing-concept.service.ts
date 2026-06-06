/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'core/dto';
import { PaginatedResult } from 'core/interface';
import { BillingConcept } from 'database/entities';
import { AcademicYearService } from 'feature/academic-year/bussiness/services';
import { BillingConceptRepository } from 'feature/billing-concept/infraestructura/repository';
import { CreateBillingConceptDto, UpdateBillingConceptDto } from 'feature/billing-concept/presentation/dto';

@Injectable()
export class BillingConceptService { 

  constructor(
    private readonly billingConceptRepository: BillingConceptRepository,
    private readonly academicYearService: AcademicYearService
  ){}

  public async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<BillingConcept>> {
    return await this.billingConceptRepository.findAll(paginationDto);
  }

  public async findById(id: number): Promise<BillingConcept | null> {
    const findId = await this.billingConceptRepository.findById(id);
    if (!findId) {
      throw new NotFoundException(`Servicio o producto con id ${id} no encontrado`);
    }
    return findId;
  }

  public async createBillingConcept(createBillingConceptDto: CreateBillingConceptDto): Promise<BillingConcept> {
    const findNameAndAcademicPeriod = await this.billingConceptRepository.findByNameAndAcademicPeriod(createBillingConceptDto.name, createBillingConceptDto.academicYearId);
    if (findNameAndAcademicPeriod) {
      throw new NotFoundException(`Servicio o producto con nombre ${createBillingConceptDto.name} ya existe en el periodo académico ${createBillingConceptDto.academicYearId}`);
    }
    const findByAcademicYear = await this.academicYearService.findOne(createBillingConceptDto.academicYearId);
    if (!findByAcademicYear) {
      throw new NotFoundException(`Periodo académico con id ${createBillingConceptDto.academicYearId} no encontrado`);
    }
    if(!findByAcademicYear.isActive) {
      throw new BadRequestException(`Periodo académico con id ${createBillingConceptDto.academicYearId} no está activo`);
    }
    const billingConcept = new BillingConcept();
    billingConcept.name = createBillingConceptDto.name;
    billingConcept.description = createBillingConceptDto.description;
    billingConcept.amount = +createBillingConceptDto.amount;
    billingConcept.type = createBillingConceptDto.type;
    billingConcept.academicYear = findByAcademicYear;
    return await this.billingConceptRepository.create(billingConcept);
  }
  
  public async updateBillingConcept(id: number, updateBillingConceptDto: UpdateBillingConceptDto): Promise<BillingConcept> {
    const billingConcept = await this.findById(id);
    if (!billingConcept) {
      throw new NotFoundException(`Servicio o producto con id ${id} no encontrado`);
    }
    if (updateBillingConceptDto.name !== undefined) {
      billingConcept.name = updateBillingConceptDto.name;
    }
    if (updateBillingConceptDto.description !== undefined) {
      billingConcept.description = updateBillingConceptDto.description;
    }
    if (updateBillingConceptDto.amount !== undefined) {
      billingConcept.amount = +updateBillingConceptDto.amount;
    }
    if (updateBillingConceptDto.type !== undefined) {
      billingConcept.type = updateBillingConceptDto.type;
    }
    const findByAcademicYear = await this.academicYearService.findOne(updateBillingConceptDto.academicYearId?? billingConcept.academicYear.id);
    if (!findByAcademicYear) {
      throw new NotFoundException(`Periodo académico con id ${updateBillingConceptDto.academicYearId} no encontrado`);
    }
    if(!findByAcademicYear.isActive) {
      throw new BadRequestException(`Periodo académico con id ${updateBillingConceptDto.academicYearId} no está activo`);
    }
    
    billingConcept.academicYear = findByAcademicYear;
    const findNameAndAcademicPeriod = await this.billingConceptRepository.findByNameAndAcademicPeriod(billingConcept.name, billingConcept.academicYear.id);
    if (findNameAndAcademicPeriod && findNameAndAcademicPeriod.id !== billingConcept.id) {
      throw new NotFoundException(`Servicio o producto con nombre ${billingConcept.name} ya existe en el periodo académico ${billingConcept.academicYear.id}`);
    }
    return await this.billingConceptRepository.update(billingConcept);
  }

  public async deleteBillingConcept(id: number): Promise<BillingConcept> {
    const billingConcept = await this.findById(id);
    if (!billingConcept) {
      throw new NotFoundException(`Servicio o producto con id ${id} no encontrado`);
    }
    billingConcept.isActive = !billingConcept.isActive;
    return await this.billingConceptRepository.update(billingConcept);
  }
}
