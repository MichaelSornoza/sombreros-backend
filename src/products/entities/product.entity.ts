import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  stock: Number;

  @Column({ nullable: false })
  price: string;

  @Column()
  image: string;
}
