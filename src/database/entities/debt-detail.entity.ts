import { BaseEntity } from "core/entities";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Debt } from "./debt.entity";
import { BillingConcept } from "./billing-concept.entity";
import { Student } from "./student.entity";


@Entity('debt_detail')
export class DebtDetail extends BaseEntity {

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'amount' })
  amount: number;

  @Column({ type: 'boolean', name: 'is_payment' })
  isPayment: boolean;


  @JoinColumn({name: 'student_id'})
  @ManyToOne(() => Student, student => student)
  student: Student;

  @JoinColumn({ name: 'concept_id' })
  @ManyToOne(() => BillingConcept, billingConcept => billingConcept)
  concept: BillingConcept;

  @JoinColumn({ name: 'debt_id' })
  @ManyToOne(() => Debt, debt => debt.details)
  debt: Debt;

}