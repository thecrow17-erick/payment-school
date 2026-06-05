import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from './presentation/controller/student.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Student } from 'database/entities';
import { StudentService } from './bussiness/services';
import { StudentRepository } from './infraestructure/repository';
import { FatherModule } from 'feature/father/father.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Student]),
        FatherModule
    ],
    controllers: [
        StudentController,],
    providers: [
        StudentService,
        StudentRepository,
    ],
})
export class StudentModule { }
