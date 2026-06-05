import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthRepositoryInterface } from '../interface';

@Injectable()
export class AuthRepository implements AuthRepositoryInterface {

  constructor(
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Compara una contraseña en texto plano contra su hash bcrypt.
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Genera un JWT firmado a partir del payload.
   * El secret y el expiresIn son tomados de la configuración del JwtModule.
   */
  async generateToken<T extends object>(payload: T): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  /**
   * Decodifica y verifica la firma de un JWT.
   * Retorna el payload si el token es válido, o null si es inválido/expirado.
   */
  async tokenDecode<T extends object>(token: string): Promise<T | null> {
    try {
      return await this.jwtService.verifyAsync<T>(token);
    } catch {
      return null;
    }
  }
}