import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room } from './entities/room.entity';

import { CreateRoomDto, UpdateRoomDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { HandleDBExceptions } from 'src/common/helpers/handleDBExeption.helper';

@Injectable()
export class RoomsService {
  private readonly nameService = 'RoomsService';

  constructor(
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    try {
      const newRoom = this.roomsRepository.create(createRoomDto);

      return await this.roomsRepository.save(newRoom);
    } catch (error) {
      HandleDBExceptions(error, this.nameService);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {
      limit = 10,
      offset = 0,
      order = 'asc',
      sortBy = 'number',
    } = paginationDto;

    return this.roomsRepository.find({
      take: limit,
      skip: offset,
      order: { [sortBy]: order },
    });
  }

  async findOne(id: number) {
    return await this.existRoom(id);
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    await this.existRoom(id);

    await this.roomsRepository.update(id, updateRoomDto);

    return {
      message: 'Room updated',
    };
  }

  async remove(id: number) {
    const room = await this.existRoom(id);

    await this.roomsRepository.remove(room);

    return { message: 'Room deleted' };
  }

  private readonly existRoom = async (id: number) => {
    const room = await this.roomsRepository.findOneBy({ id });

    if (!room) throw new BadRequestException('Room not found');

    return room;
  };
}
