import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  nombres: string;

  @Column({ nullable: false })
  apellidos: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({ default: 'customer' })
  role: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
