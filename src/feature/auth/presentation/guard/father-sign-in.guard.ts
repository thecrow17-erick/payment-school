/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { SignInResponse } from 'feature/auth/bussiness/interface';
import { AuthRepository } from 'feature/auth/infraestructure/repository/auth.repository';
import { FatherService } from 'feature/father/Bussines/service';
import { Observable } from 'rxjs';

@Injectable()
export class FatherSignInGuard implements CanActivate {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly fatherService: FatherService
  ) {}


  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;
    let token: string = "";
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
    if (!token) {
      throw new NotFoundException('Token no encontrado');
    }
    const fatherDecode = await this.authRepository.tokenDecode<SignInResponse>(token);
    if(!fatherDecode){
      throw new NotFoundException('Padre no encontrado, o fecha de expiración del token ha pasado');
    }
    const findIdFather = await this.fatherService.findOne(fatherDecode.father.id);
    if(!findIdFather){
      throw new NotFoundException('Padre no encontrado');
    }
    if(!findIdFather.isActive){
      throw new NotFoundException('Padre no está activo');
    }
    return true;
  }
}
