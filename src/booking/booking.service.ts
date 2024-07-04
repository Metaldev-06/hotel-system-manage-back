import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { HandleDBExceptions } from 'src/common/helpers/handleDBExeption.helper';
import { Client } from 'src/clients/entities/client.entity';
import { Pricing } from 'src/pricing/entities/pricing.entity';

@Injectable()
export class BookingService {
  private readonly nameService = 'BookingService';

  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(Pricing)
    private readonly pricingRepository: Repository<Pricing>,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const { price, ...restData } = createBookingDto;

    try {
      const client = await this.pricingRepository.findOneBy({ id: price });

      if (!client) throw new BadRequestException('Client not found');

      const newBooking = this.bookingRepository.create({
        ...restData,
        price: client,
      });
      await this.bookingRepository.save(newBooking);
      return newBooking;
    } catch (error) {
      HandleDBExceptions(error, this.nameService);
    }
  }

  findAll() {
    return this.bookingRepository.find();
  }

  findOne(id: string) {
    return this.existsBookings(id);
  }

  update(id: string, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: string) {
    return `This action removes a #${id} booking`;
  }

  private readonly existsBookings = (id: string) => {
    const bookings = this.bookingRepository.findOneBy({ id });

    if (!bookings) throw new BadRequestException('Booking not found');

    return bookings;
  };
}
