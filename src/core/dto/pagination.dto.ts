import { IsDateString, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { PaginatedResult } from 'core/interface/pagination.interface';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  readonly limit?: number = 10;

  @IsOptional()
  @IsString()
  readonly search?: string;

  @IsOptional()
  @IsDateString()
  readonly startDate?: string;

  @IsOptional()
  @IsDateString()
  readonly endDate?: string;
}


