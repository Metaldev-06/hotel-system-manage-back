import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Pricing } from 'src/pricing/entities/pricing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), Client, Pricing],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
