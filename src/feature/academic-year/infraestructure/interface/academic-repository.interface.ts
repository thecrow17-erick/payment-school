import { PaginatedResult } from 'core/interface';
import { PaginationDto } from '../../../../core/dto/pagination.dto';
import { AcademicYear } from '@database/entities';


export interface AcademicYearRepositoryInterface {
  findAll(paginationDto: PaginationDto): Promise<PaginatedResult<AcademicYear>>;
  createAcademicYear(academicYear: AcademicYear): Promise<AcademicYear>;
  findById(id: number): Promise<AcademicYear | null>;
  updateAcademicYear(academicYear: AcademicYear): Promise<AcademicYear>;
  findByCode(code: string): Promise<AcademicYear | null>;
}