import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  username!: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  password!: string;
}
