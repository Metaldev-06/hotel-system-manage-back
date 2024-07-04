import { IsDate, IsInt, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  checking: string;

  @IsString()
  checkout: string;

  @IsInt()
  price: number;
}
