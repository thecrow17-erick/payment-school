import { BaseEntity } from "core/entities";
import { Column, Entity, OneToMany } from "typeorm";
import { Debt } from "./debt.entity";


@Entity('employee')
export class Employee extends BaseEntity {

  @Column({ type: 'varchar', length: 255, name: 'erp_code'})
  erpCode: string;

  @Column({ type: 'int', name: 'external_id' })
  externalId: number;

  @Column({name: 'is_active', default: true, type: 'boolean'})
  isActive: boolean;

  @OneToMany(() => Debt, debt => debt.employee)
  debts: Debt[];
}