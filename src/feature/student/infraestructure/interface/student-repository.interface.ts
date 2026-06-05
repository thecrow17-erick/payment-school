import { Student } from "@database/entities";
import { PaginationDto } from "core/dto";
import { PaginatedResult } from "core/interface";


export interface StudentRepositoryInterface {
  findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Student>>;
  createStudent(student: Student): Promise<Student>;
  updateStudent(student: Student): Promise<Student>;
  findByEmail(email: string): Promise<Student | null>; 
  findById(id: number): Promise<Student | null>;
}