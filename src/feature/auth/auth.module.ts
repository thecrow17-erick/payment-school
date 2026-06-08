import { AuthService } from './bussiness/service/auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './presentation/controller/auth.controller';
import { AuthRepository } from './infraestructure/repository';
import { FatherModule } from 'feature/father/father.module';
import { FatherSignInGuard } from './presentation/guard';
import { EmployeeAuthAdapter } from './infraestructure/adapter';
import { RabbitCoreModule } from 'core/rabbitMQ/rabbit-core/rabbit-core.module';
import { EmployeeModule } from 'feature/employee/employee.module';

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
        FatherModule,
        EmployeeModule
    ],
    controllers: [AuthController],
    providers: [
        AuthService, AuthRepository, {
            provide: 'EmployeeAdapterInterface',
            useClass: EmployeeAuthAdapter
        },
        EmployeeAuthAdapter
    ],
    exports: [PassportModule, JwtModule, AuthService, AuthRepository,  'EmployeeAdapterInterface', EmployeeAuthAdapter],
})
export class AuthModule { }
