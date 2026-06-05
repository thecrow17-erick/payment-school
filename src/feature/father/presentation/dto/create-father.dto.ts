import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength } from "class-validator";

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
  @IsNotEmpty()
  @IsPhoneNumber('BO')
  phone!: string;

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
}