import { IsDecimal, IsEnum, IsInt, IsOptional, IsString, MaxLength } from "class-validator";
import { CreateBillingConceptDto } from "./create-biling-concept.dto";
import { BillingConceptType } from "database/entities";

export class UpdateBillingConceptDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

  @IsDecimal({ decimal_digits: '5' })
  @IsOptional()
  amount?: string;

  @IsEnum(BillingConceptType)
  @IsOptional()
  type?: BillingConceptType;

  @IsInt()
  @IsOptional()
  academicYearId?: number; 
}