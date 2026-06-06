import { BillingConceptModule } from './feature/billing-concept/billing-concept.module';
import { AcademicYearModule } from './feature/academic-year/academic-year.module';
import { AuthModule } from './feature/auth/auth.module';
import { StudentModule } from './feature/student/student.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './core/filter';
import { FatherModule } from './feature/father/father.module';
import { Module } from '@nestjs/common';
import {EnvConfigModule} from "@config/enviroments/envConfigModule";
import { ConfigDatabaseModule } from '@config/typeOrm';
import { TransformResponseInterceptor } from '@core/interceptor';

@Module({
  imports: [
        BillingConceptModule, 
    AcademicYearModule, 
    AuthModule, 
    StudentModule, 
    FatherModule, 
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
