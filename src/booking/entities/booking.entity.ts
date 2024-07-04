import { Client } from 'src/clients/entities/client.entity';
import { Pricing } from 'src/pricing/entities/pricing.entity';
import { Room } from 'src/rooms/entities/room.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  checking: Date;

  @Column('date')
  checkout: Date;

  //   @Column()
  //   room: Room;

  //   @Column()
  //   client: Client;

  @OneToOne(() => Pricing, (pricing) => pricing.id, {
    cascade: true,
    eager: true,
  })
  price: Pricing;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
