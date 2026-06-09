import { BaseEntity } from "core/entities";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Payment } from "./payment.entity";
import { BillingConcept } from "./billing-concept.entity";
import { DebtDetail } from "./debt-detail.entity";


@Entity('payment_detail')
export class PaymentDetail extends BaseEntity {

  @Column({name: "amount", type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @JoinColumn({ name: "payment_id" })
  @ManyToOne(() => Payment, (payment) => payment.id)
  payment: Payment;

  @JoinColumn({ name: "concept_id" })
  @ManyToOne(() => BillingConcept, (concept) => concept.id)
  concept: BillingConcept;

  @JoinColumn({name: "debt_detail_id" })
  @OneToOne(() => DebtDetail, (debtDetail) => debtDetail.paymentDetail)
  debtDetail: DebtDetail;
}