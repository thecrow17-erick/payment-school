import { Type } from "class-transformer";
import { IsDateString, IsInt, IsNotEmpty, IsString, MaxLength, ValidateNested } from "class-validator";
import { CreateDebtDetailDto } from "./create-debt-detail.dto";


export class CreateDebtDto {
  @IsDateString()
  @IsNotEmpty()
  dueDate: string; // Recibe formato 'YYYY-MM-DD' de Postman

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @IsInt()
  @IsNotEmpty()
  employeeId: number;

  @IsNotEmpty()
  @ValidateNested({ each: true }) 
  @Type(() => CreateDebtDetailDto)
  details: CreateDebtDetailDto[];
}