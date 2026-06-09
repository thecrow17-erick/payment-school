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
    ],
    controllers: [
        PaymentMethodController,
    ],
    providers: [
        PaymentMethodService, PaymentMethodRepository, PaymentRepository,
    ],
    exports: [
        PaymentMethodService, PaymentMethodRepository, PaymentRepository,
    ]
})
export class PaymentModule {}
