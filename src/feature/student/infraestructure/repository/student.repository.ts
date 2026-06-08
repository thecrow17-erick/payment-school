/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '@database/entities';
import { Repository } from 'typeorm';
import { StudentRepositoryInterface } from '../interface';
import { PaginationDto } from 'core/dto';
import { PaginatedResult } from 'core/interface';
import { paginate } from '@core/util';

@Injectable()
export class StudentRepository implements StudentRepositoryInterface { 
  constructor(
    @InjectRepository(Student)
    private readonly repository: Repository<Student>,
  ) {}

  public async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Student>> {
    const queryBuilder = this.repository.createQueryBuilder('student');
    if (paginationDto.search) {
      const searchPattern = `%${paginationDto.search}%`;
      queryBuilder.where(
        '(student.name ILIKE :search OR student.lastName ILIKE :search OR student.email ILIKE :search)',
        { search: searchPattern }
      );
    }
    return await paginate(queryBuilder, paginationDto);
  }

  public async createStudent(student: Student): Promise<Student> {
    const newStudent = this.repository.create(student);
    return this.repository.save(newStudent);
  }

  public async findByEmail(email: string): Promise<Student | null> {
    return this.repository.findOne({ where: { email } });
  }

  public async updateStudent(student: Student): Promise<Student> {
    return this.repository.save(student);
  }
  public async findById(id: number): Promise<Student | null> {
    return this.repository.findOne({ where: { id } });
  }

  public async findStudentsByIdList(ids: number[]): Promise<Student[]> {
    const queryBuilder = this.repository.createQueryBuilder('student');
    queryBuilder.where('student.id IN (:...ids)', { ids });
    return queryBuilder.getMany();
  }
}
