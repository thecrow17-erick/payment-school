import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateFatherDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  name!: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  @MaxLength(150)
  @IsNotEmpty()
  email!: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  phone?: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  username!: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  password!: string;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  typeDoc!: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  document!: string;

  @IsString()
  @MaxLength(150)
  @IsOptional()
  reasonSocial?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}