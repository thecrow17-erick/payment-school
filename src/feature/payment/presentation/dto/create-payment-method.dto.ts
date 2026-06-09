import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreatePaymentMethodDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  code: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

}
