import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@core/entities';
import { Father } from './father.entity';

@Entity('students')
export class Student extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 100 })
  name!: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastName!: string;

  @Column({ name: 'email', type: 'varchar', length: 150, nullable: true })
  email!: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @ManyToOne(() => Father, (father) => father.students, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'father_id' })
  father!: Father;
}
