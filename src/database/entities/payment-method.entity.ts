import { BaseEntity } from "core/entities";
import { Column, Entity, OneToMany } from "typeorm";
import { Payment } from "./payment.entity";


@Entity('payment_method')
export class PaymentMethod extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => Payment, (payment) => payment.paymentMethod)
  payments: Payment[];
}