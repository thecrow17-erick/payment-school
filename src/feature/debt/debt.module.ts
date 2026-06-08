import { DebtController } from './presentation/controller/debt.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtDetail } from 'database/entities/debt-detail.entity';
import { Debt } from 'database/entities/debt.entity';
import { DebtRepository } from './infraestucture/repository';
import { DebtService } from './bussiness/services';
import { AuthModule } from 'feature/auth/auth.module';
import { FatherModule } from 'feature/father/father.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RawSerializer } from 'core/serializer/raw-serializer.serializer';
import { EmployeeModule } from 'feature/employee/employee.module';
import { BillingConceptModule } from 'feature/billing-concept/billing-concept.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Debt, DebtDetail]),
        FatherModule,
        AuthModule,
        EmployeeModule,
        BillingConceptModule,
    ],
    controllers: [
        DebtController, ],
    providers: [
        DebtService, DebtRepository],
})
export class DebtModule { }
