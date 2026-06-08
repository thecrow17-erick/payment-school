import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  erpCode: string;

  @IsNotEmpty()
  @IsInt()
  externalId: number;
}
