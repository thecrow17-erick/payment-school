import { IsInt, IsNotEmpty } from "class-validator";

export class CreateDebtDetailDto {

  @IsInt()
  @IsNotEmpty()
  studentId: number; // Mapea al ID del estudiante

  @IsInt()
  @IsNotEmpty()
  conceptId: number; // Mapea al ID del concepto de cobro
}