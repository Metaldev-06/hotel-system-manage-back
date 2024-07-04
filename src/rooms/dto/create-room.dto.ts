import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';
import { RoomType } from 'src/common/enums/roomType.enum';

export class CreateRoomDto {
  @IsNumber()
  @IsPositive()
  number: number;

  @IsEnum(RoomType, {
    message: 'Type must be either "matrimonial" or "individual"',
  })
  type: RoomType;
}
