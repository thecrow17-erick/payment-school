import { BaseEntity } from "core/entities";
import { Column } from "typeorm";


export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export class Payment extends BaseEntity {
  @Column({name: "description", })
  description: string;
  totalAmount: number


}