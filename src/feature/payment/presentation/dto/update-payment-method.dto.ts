import { IsBoolean, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdatePaymentMethodDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  code?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

}
