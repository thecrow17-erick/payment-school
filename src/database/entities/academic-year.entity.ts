import { BaseEntity } from "core/entities";
import { Column, Entity, OneToMany } from "typeorm";
import { BillingConcept } from "./billing-concept.entity";


@Entity("academic_year")
export class AcademicYear extends BaseEntity {
  @Column({ type: "varchar", length: 50, unique: true })
  code!: string;

  @Column({ type: "date" })
  endDate!: Date;

  @Column({ type: "date" })
  startDate!: Date;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @OneToMany(()=> BillingConcept, (billingConcept) => billingConcept.academicYear)
  billingConcepts!: BillingConcept[];

}