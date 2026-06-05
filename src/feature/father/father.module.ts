import { FatherController } from './presentation/controllers/father.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { FatherService } from './Bussines/service';
import { FatherRepository } from './infraestructure/repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Father } from '@database/entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([Father])
    ],
    controllers: [
        FatherController, 
    ],
    providers: [FatherService, FatherRepository],
    exports: [FatherService]
})
export class FatherModule { }
