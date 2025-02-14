import { Transform } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @Transform(({ value }) => parseFloat(value), { toPlainOnly: true }) // Convert to number for response
  price: number;

  @Column()
  currency: string;

  @Column({ type: 'varchar', nullable: true })
  shop: string | null;

  @Column()
  category: string;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'createdById' })
  createdBy: UserEntity;

  @UpdateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    price: number,
    currency: string,
    shop: string,
    category: string,
    createdBy: UserEntity,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.currency = currency;
    this.shop = shop;
    this.category = category;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
