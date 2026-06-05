/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthRepository } from 'feature/auth/infraestructure/repository';
import { LoginDto } from 'feature/auth/presentation/dto';
import { FatherService } from 'feature/father/Bussines/service';
import { SignInResponse } from '../interface';

@Injectable()
export class AuthService { 
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly fatherService: FatherService
  ){}

  public async authSignIn(body: LoginDto): Promise<SignInResponse>{
    const { username, password } = body;
    const user = await this.fatherService.findByUsername(username);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const isPasswordValid = await this.authRepository.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Contraseña incorrecta');
    }
    const token = await this.authRepository.generateToken({ id: user.id, username: user.username });
    return {
      father: user,
      token
    }
  }

}
