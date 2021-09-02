import {
  IsString,
  IsDefined,
  IsNumber,
  IsPositive,
  IsUrl,
} from 'class-validator';
import { Product } from '@schemas/product.schema';
import { WithId, WithPagination } from '@common/interfaces';

export class CreateProductDto implements Product {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsDefined()
  @IsUrl()
  imageUrl: string;

  @IsDefined()
  @IsString()
  description: string;
}

export class FindProductsDto extends WithPagination {}

export class FindProductDto extends WithId {}
