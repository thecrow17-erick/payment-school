import { AuthService } from './bussiness/service/auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './presentation/controller/auth.controller';
import { AuthRepository } from './infraestructure/repository';
import { FatherModule } from 'feature/father/father.module';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('jwtSecret') as string,
                signOptions: {
                    expiresIn: (configService.get<string>('jwtExpiresIn') || '24h') as any,
                },
            }),
        }),
        FatherModule
    ],
    controllers: [AuthController],
    providers: [
        AuthService, AuthRepository
    ],
    exports: [PassportModule, JwtModule],
})
export class AuthModule { }
