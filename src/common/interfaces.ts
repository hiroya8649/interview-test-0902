import { Type } from 'class-transformer';
import { IsDefined, IsInt, IsOptional, IsPositive } from 'class-validator';
import { ObjectId, Types } from 'mongoose';
import { IsObjectId } from './validators';

export class WithPagination {
  @IsOptional()
  @IsObjectId()
  lastId: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  pageSize: number;
}

export class WithId {
  @IsDefined()
  @IsObjectId()
  @Type(() => Types.ObjectId)
  id: ObjectId;
}
