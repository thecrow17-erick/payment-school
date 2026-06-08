import { BaseEntity } from "core/entities";
import { Column, Entity } from "typeorm";


@Entity('payment_method')
export class PaymentMethod extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;
}