import { DebtModule } from './feature/debt/debt.module';
import { BillingConceptModule } from './feature/billing-concept/billing-concept.module';
import { AcademicYearModule } from './feature/academic-year/academic-year.module';
import { AuthModule } from './feature/auth/auth.module';
import { StudentModule } from './feature/student/student.module';
import { EmployeeModule } from './feature/employee/employee.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './core/filter';
import { FatherModule } from './feature/father/father.module';
import { Module } from '@nestjs/common';
import {EnvConfigModule} from "@config/enviroments/envConfigModule";
import { ConfigDatabaseModule } from '@config/typeOrm';
import { TransformResponseInterceptor } from '@core/interceptor';

@Module({
  imports: [
        DebtModule, 
    BillingConceptModule, 
    AcademicYearModule, 
    AuthModule, 
    StudentModule, 
    FatherModule, 
    EmployeeModule,
    EnvConfigModule,
    ConfigDatabaseModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    }
  ],
})
export class AppModule {}
