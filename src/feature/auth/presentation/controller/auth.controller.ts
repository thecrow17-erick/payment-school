/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from '../dto';
import { ApiResponse } from 'core/interface';
import { SignInResponse } from 'feature/auth/bussiness/interface';
import { AuthService } from 'feature/auth/bussiness/service';

@Controller("auth")
export class AuthController { 

  constructor(
    private readonly authService: AuthService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  public async signIn(@Body() body: LoginDto): Promise<ApiResponse<SignInResponse>> {
    return {
      message: "Inicio de sesión exitoso",
      data: await this.authService.authSignIn(body)
    }

  }
}
