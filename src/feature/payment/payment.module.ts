import { StripeService } from './bussiness/services/stripe.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaymentMethodController } from './presentation/controller/payment-method.controller';
import { PaymentMethodService } from './bussiness/services/payment-method.service';
import { Module } from '@nestjs/common';
import { PaymentMethodRepository } from './infraestructura/repository';
import { PaymentRepository } from './infraestructura/repository';
import { Payment, PaymentDetail, PaymentMethod } from 'database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([PaymentMethod, Payment, PaymentDetail]),
        ConfigModule
    ],
    controllers: [
        PaymentMethodController,
    ],
    providers: [ StripeService,
        PaymentMethodService, PaymentMethodRepository, PaymentRepository,
        {
            provide: 'STRIPE_KEY',
            useFactory: async(configService: ConfigService) => configService.get<string>('stripe_key'),
            inject: [ConfigService]
        }
    ],
    exports: [
        PaymentMethodService, PaymentMethodRepository, PaymentRepository,
    ]
})
export class PaymentModule {}
