import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import {
  PricingCategory,
  PricingType,
} from 'src/common/enums/pricingType.enum';

export class CreatePricingDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(PricingCategory)
  category: PricingCategory;

  @IsString()
  @IsNotEmpty()
  @IsEnum(PricingType)
  type: PricingType;

  @IsNumber()
  @IsPositive()
  price: number;
}
