import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePricingDto, UpdatePricingDto } from './dto/';
import { HandleDBExceptions } from 'src/common/helpers/handleDBExeption.helper';

import { Pricing } from './entities/pricing.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class PricingService {
  private readonly nameService = 'PricingService';

  constructor(
    @InjectRepository(Pricing)
    private readonly pricingRepository: Repository<Pricing>,
  ) {}

  async create(createPricingDto: CreatePricingDto) {
    try {
      const newPricing = this.pricingRepository.create(createPricingDto);
      return await this.pricingRepository.save(newPricing);
    } catch (error) {
      HandleDBExceptions(error, this.nameService);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { order = 'asc', sortBy = 'price' } = paginationDto;

    return await this.pricingRepository.find({
      order: { [sortBy]: order },
    });
  }

  async findOne(id: number) {
    return await this.existsPricing(id);
  }

  async update(id: number, updatePricingDto: UpdatePricingDto) {
    await this.existsPricing(id);

    await this.pricingRepository.update(id, updatePricingDto);

    return {
      message: 'Pricing updated',
    };
  }

  async remove(id: number) {
    const room = await this.existsPricing(id);

    await this.pricingRepository.remove(room);

    return { message: 'Pricing deleted' };
  }

  private readonly existsPricing = async (id: number) => {
    const pricing = await this.pricingRepository.findOneBy({ id });
    if (!pricing)
      throw new BadRequestException(`Pricing with id ${id} not found`);
    return pricing;
  };
}
