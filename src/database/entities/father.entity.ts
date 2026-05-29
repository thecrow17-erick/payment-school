import { Column, Entity, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Student } from './student.entity';

@Entity('fathers')
export class Father extends User {
  @Column({ name: 'type_doc', type: 'varchar', length: 20 })
  typeDoc!: string;

  @Column({ name: 'document', type: 'varchar', length: 50 })
  document!: string;

  @Column({ name: 'reason_social', type: 'varchar', nullable: true, length: 150 })
  reasonSocial!: string;

  @OneToMany(() => Student, (student) => student.father)
  students!: Student[];
}
