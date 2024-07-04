import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { RoomType } from 'src/common/enums/roomType.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('rooms')
@UseInterceptors(ClassSerializerInterceptor)
export class Room {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('int')
  number: number;

  @Column('text')
  type: RoomType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
