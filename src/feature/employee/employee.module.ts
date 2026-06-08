/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'database/entities';
import { EmployeeService } from './bussiness/services';
import { EmployeeRepository } from './infraestructure/repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
  ],
  controllers: [],
  providers: [
    EmployeeService,
    EmployeeRepository,
  ],
  exports: [
    EmployeeService,
  ],
})
export class EmployeeModule {}
