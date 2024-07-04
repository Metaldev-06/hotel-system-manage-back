import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { HandleDBExceptions } from 'src/common/helpers/handleDBExeption.helper';

@Injectable()
export class ClientsService {
  private readonly nameService = 'ClientsService';

  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const newClient = this.clientsRepository.create(createClientDto);

      return await this.clientsRepository.save(newClient);
    } catch (error) {
      HandleDBExceptions(error, this.nameService);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this.clientsRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: string) {
    const client = await this.clientsRepository.findOneBy({ id });

    if (!client) throw new BadRequestException('Client not found');

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    await this.existsClient(id);

    await this.clientsRepository.update(id, updateClientDto);

    return {
      message: 'Client updated successfully',
    };
  }

  async remove(id: string) {
    const client = await this.existsClient(id);

    console.log(client);

    await this.clientsRepository.softRemove(client);

    return {
      message: 'Client deleted successfully',
    };
  }

  private readonly existsClient = async (id: string) => {
    const client = await this.clientsRepository.findOneBy({ id });
    if (!client)
      throw new BadRequestException(`Client with ID ${id} not found`);
    return client;
  };
}
