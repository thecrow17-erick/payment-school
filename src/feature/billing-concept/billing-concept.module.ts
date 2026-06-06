import { BillingConceptController } from './presentation/controller/billing-concept.controller';
import { BillingConceptService } from './bussiness/services/billing-concept.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { BillingConceptRepository } from './infraestructura/repository';
import { BillingConcept } from 'database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicYearModule } from 'feature/academic-year/academic-year.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([BillingConcept]),
        AcademicYearModule
    ],
    controllers: [
        BillingConceptController, ],
    providers: [
        BillingConceptService, BillingConceptRepository
    ],
})
export class BillingConceptModule { }
