import { BaseEntity } from '@core/entities';
import { Column } from 'typeorm';


export abstract class User extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 100 })
  name!: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastName!: string;

  @Column({ name: 'email', type: 'varchar', unique: true, length: 150 })
  email!: string;

  @Column({ name: 'phone', type: 'varchar', nullable: true, length: 20 })
  phone!: string;

  @Column({ name: 'username', type: 'varchar', unique: true, length: 50 })
  username!: string;

  @Column({ name: 'password', type: 'varchar', length: 255 })
  password!: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;
}
