import { IsDecimal, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { BillingConceptType } from "database/entities";

export class CreateBillingConceptDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @IsDecimal({ decimal_digits: '5'}) 
  @IsNotEmpty()
  amount: string;

  @IsEnum(BillingConceptType)
  @IsNotEmpty()
  type: BillingConceptType;

  @IsInt()
  @IsNotEmpty()
  academicYearId: number; 
}