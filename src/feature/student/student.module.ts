import { StudentController } from './presentation/controller/student.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        StudentController, ],
    providers: [],
})
export class StudentModule { }
