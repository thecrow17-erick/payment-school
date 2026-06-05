/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationDto } from 'core/dto';
import { ApiResponse, PaginatedResult } from 'core/interface';
import { Student } from '@database/entities';
import { StudentService } from 'feature/student/bussiness/services';
import { CreateStudentDto } from '../dto';

@Controller('student')
export class StudentController { 
  constructor(
    private readonly studentService: StudentService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  public async findAll(@Query() paginationDto: PaginationDto): Promise<ApiResponse<PaginatedResult<Student>>> {
    return {
      message: "Lista de estudiantes obtenida exitosamente",
      data: await this.studentService.findAll(paginationDto)
    };
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  public async findOne(@Param('id') id: number): Promise<ApiResponse<Student>> {
    return {
      message: "Estudiante obtenido exitosamente",
      data: await this.studentService.findOne(id)
    };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createStudent(@Body() createStudentDto: CreateStudentDto): Promise<ApiResponse<Student>> {
    return {
      message: "Estudiante creado exitosamente",
      data: await this.studentService.createStudent(createStudentDto)
    };
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  public async updateStudent(@Param('id') id: number, @Body() updateStudentDto: CreateStudentDto): Promise<ApiResponse<Student>> {
    return {
      message: "Estudiante actualizado exitosamente",
      data: await this.studentService.updateStudent(id, updateStudentDto)
    };
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  public async deleteStudent(@Param('id') id: number): Promise<ApiResponse<Student>> {
    const student = await this.studentService.deleteStudent(id);
    return {
      message: `Estudiante ${student.isActive ? 'activado' : 'desactivado'} exitosamente`,
      data: student
    };
  }
}
