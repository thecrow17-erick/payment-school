import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  erpCode?: string;

  @IsOptional()
  @IsInt()
  externalId?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
