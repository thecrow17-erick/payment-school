import { BaseEntity } from "core/entities";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute.js";
import { AcademicYear } from "./academic-year.entity";
import { DebtDetail } from "./debt-detail.entity";



export enum BillingConceptType {
  SERVICE = 'service',
  PRODUCT = 'product',
  OTHER = 'other'
}

@Entity('billing_concept')
export class BillingConcept extends BaseEntity {

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name!: string;

  @Column({ name: 'description', type: 'varchar', length: 255, nullable: true })
  description!: string;

  @Column({ name: 'amount', type: 'decimal', precision: 10, scale: 2 })
  amount!: number;

  @Column({ name: 'type', type: 'enum', enum: BillingConceptType })
  type!: BillingConceptType;
  
  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @JoinColumn({ name: 'academic_year_id' })
  @ManyToOne(() => AcademicYear, (academicYear) => academicYear.billingConcepts)
  academicYear!: AcademicYear;

  @OneToMany(() => DebtDetail, (debtDetail) => debtDetail.concept)
  debtDetails!: DebtDetail[];

}


