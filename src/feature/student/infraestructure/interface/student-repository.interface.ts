import { Student } from "@database/entities";


export interface StudentRepositoryInterface {
  findAll(): Promise<Student[]>;
  createStudent(student: Student): Promise<Student>;
}