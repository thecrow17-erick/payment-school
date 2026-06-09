import { BaseEntity } from "core/entities";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { PaymentMethod } from "./payment-method.entity";
import { PaymentDetail } from "./payment-detail.entity";


export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Entity('payment')
export class Payment extends BaseEntity {
  @Column({name: "description", })
  description: string;

  @Column({name: "total_amount", })
  totalAmount: number;
  
  @Column({name: "status", type: "enum", enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @Column({name: "payment_date", type: "date" })
  paymentDate: Date;

  @Column({name: "transaction_id", type: "varchar", length: 255 })
  transactionId: string;
  
  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.id)
  @JoinColumn({ name: "payment_method_id" })
  paymentMethod: PaymentMethod;

  @OneToMany(() => PaymentDetail, (paymentDetail) => paymentDetail.payment)
  paymentDetails: PaymentDetail[];
}