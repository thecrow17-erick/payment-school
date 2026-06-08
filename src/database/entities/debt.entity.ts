import { BaseEntity } from "core/entities";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { DebtDetail } from "./debt-detail.entity";
import { Employee } from "./employee.entity";


export enum DebtStatus {
  OK = 'ok',
  PAID = 'paid',
  CANCEL = 'cancel'
}

@Entity('debt')
export class Debt extends BaseEntity {

  @Column({ type: 'date', name: 'due_date' })
  dueDate: Date;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({type: 'enum', enum: DebtStatus, default: DebtStatus.OK})
  status: DebtStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'total_amount' })
  totalAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'total_debt' })
  totalDebt: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'total_payment' })
  totalPayment: number;


  @OneToMany(() => DebtDetail, debtDetail => debtDetail.debt)
  details: DebtDetail[];

  @JoinColumn({ name: 'employee_id' })
  @ManyToOne(() => Employee, employee => employee.debts)
  employee: Employee;
}