/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'core/dto';
import { PaginatedResult } from 'core/interface';
import { Father, Student } from 'database/entities';
import { StudentRepository } from 'feature/student/infraestructure/repository';
import { CreateStudentDto, UpdateStudentDto } from 'feature/student/presentation/dto';
import { FatherService } from '../../../father/Bussines/service/father.service';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly FatherService: FatherService
  ) {}

  public async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Student>> {
    return await this.studentRepository.findAll(paginationDto);
  }
  
  public async createStudent(createStudent: CreateStudentDto): Promise<Student> {
    if(createStudent.email) {
      const findByEmail = await this.studentRepository.findByEmail(createStudent.email!);
      if(findByEmail) {
        throw new BadRequestException('Email ya existe');
      }
    }
    const findFather = await this.FatherService.findOne(createStudent.fatherId);
    if(!findFather) {
      throw new NotFoundException('Padre no existe');
    }
    if(!findFather.isActive){
      throw new BadRequestException('Padre no esta activo');
    }
    const student = new Student();
    student.name = createStudent.name;
    student.lastName = createStudent.lastName;
    student.email = createStudent.email || "";
    student.father = findFather;
    return await this.studentRepository.createStudent(student);
  }

  public async updateStudent(id: number, updateStudent: UpdateStudentDto): Promise<Student> {
    console.log(updateStudent);
    if(updateStudent.email) {
      const findByEmail = await this.studentRepository.findByEmail(updateStudent.email!);
      if(findByEmail) {
        throw new BadRequestException('Email ya existe');
      }
    }
    let father: Father | null = null;
    if(!updateStudent.fatherId) {
      father = await this.FatherService.findOne(updateStudent.fatherId!);
      if(!father) {
        throw new NotFoundException('Padre no existe');
      } 
      if(!father.isActive){
        throw new BadRequestException('Padre no esta activo');
      }
    }
    const student = await this.studentRepository.findById(id);
    if(!student) {
      throw new NotFoundException('Estudiante no existe');
    }
    student.name = updateStudent.name || student.name;
    student.lastName = updateStudent.lastName || student.lastName;
    student.email = updateStudent.email || student.email;
    student.isActive = updateStudent.isActive !== undefined ? updateStudent.isActive : student.isActive;
    student.father = father || student.father;
    return await this.studentRepository.updateStudent(student);
  }

  public async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findById(id);
    if(!student) {
      throw new NotFoundException('Estudiante no existe');
    }
    return student;
  }

  public async deleteStudent(id: number): Promise<Student> {
    const student = await this.studentRepository.findById(id);
    if(!student) {
      throw new NotFoundException('Estudiante no existe');
    }
    student.isActive = !student.isActive;
    return await this.studentRepository.updateStudent(student);
  }


}
