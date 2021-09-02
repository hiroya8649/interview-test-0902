import {
  IsDefined,
  IsPositive,
  IsInt,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { OrderItem as OI } from '@schemas/order.schema';
import { WithId } from '@common/interfaces';
import { IsObjectId } from '@common/validators';
import { ObjectId, Types } from 'mongoose';
import { Type } from 'class-transformer';

class OrderItem implements Pick<OI, 'productId' | 'count'> {
  @IsDefined()
  @IsObjectId()
  @Type(() => Types.ObjectId)
  productId: ObjectId;

  @IsDefined()
  @IsPositive()
  @IsInt()
  count: number;
}

export class CreateOrderDto {
  @IsDefined()
  @Type(() => OrderItem)
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  items: OrderItem[];
}

export class FindOrderDto extends WithId {}
