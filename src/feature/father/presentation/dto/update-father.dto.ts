import { IsBoolean, IsEmail, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateFatherDto {
  @IsString()
  @MaxLength(100)
  @IsOptional()
  name?: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @MaxLength(150)
  @IsOptional()
  email?: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  phone?: string;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  username?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  password?: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  typeDoc?: string;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  document?: string;

  @IsString()
  @MaxLength(150)
  @IsOptional()
  reasonSocial?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
