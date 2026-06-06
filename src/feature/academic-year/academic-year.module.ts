import { AcademicYearController } from './presentation/controller/academic-year.controller';
import { AcademicYearService } from './bussiness/services/academic-year.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicYear } from 'database/entities';
import { AcademicYearRepository } from './infraestructure/repository';

@Module({
    imports: [TypeOrmModule.forFeature([AcademicYear])],
    controllers: [
        AcademicYearController, ],
    providers: [
        AcademicYearService, AcademicYearRepository],
})
export class AcademicYearModule { }
