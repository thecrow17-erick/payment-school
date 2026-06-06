import { Injectable, NotFoundException } from "@nestjs/common";
import { AcademicYearRepositoryInterface } from "../interface";
import { InjectRepository } from "@nestjs/typeorm";
import { AcademicYear } from "database/entities";
import { Repository } from "typeorm";
import { PaginationDto } from "core/dto";
import { PaginatedResult } from "core/interface";
import { paginate } from "core/util";

@Injectable()
export class AcademicYearRepository implements AcademicYearRepositoryInterface{
  constructor(
    @InjectRepository(AcademicYear)
    private readonly repository: Repository<AcademicYear>
  ) {}

  public async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<AcademicYear>> {
    const queryBuilder = this.repository.createQueryBuilder('academic_year');
    if (paginationDto.search) {
      const searchPattern = `%${paginationDto.search}%`;
      queryBuilder.where(
        '(academic_year.code ILIKE :search)',
        { search: searchPattern }
      );
    }
    return await paginate(queryBuilder, paginationDto);
  }

  public async findById(id: number): Promise<AcademicYear | null> {
    const findId = await this.repository.findOne({where: { id }});
    if (!findId) {
      throw new NotFoundException("Año academico no encontrado.");
    }
    return findId;
  }

  public async createAcademicYear(academicYear: AcademicYear): Promise<AcademicYear> {
    const newAcademicYear = this.repository.create(academicYear);
    return await this.repository.save(newAcademicYear);
  }

  public async updateAcademicYear(academicYear: AcademicYear): Promise<AcademicYear> {
    return await this.repository.save(academicYear);
  }

  findByCode(code: string): Promise<AcademicYear | null> {
    return this.repository.findOne({ where: { code } });
  }
}