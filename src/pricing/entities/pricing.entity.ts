import { Booking } from 'src/booking/entities/booking.entity';
import {
  PricingCategory,
  PricingType,
} from 'src/common/enums/pricingType.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pricing')
export class Pricing {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  category: PricingCategory;

  @Column('text')
  type: PricingType;

  @Column('int')
  price: number;

  @OneToOne(() => Booking, (booking) => booking.price)
  booking: Booking;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
