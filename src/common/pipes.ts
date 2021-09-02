import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isObjectId } from './utils';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!isObjectId(value)) throw new BadRequestException('Invalid objectId');
    return value;
  }
}

@Injectable()
export class ObjectIdsValidationPipe implements PipeTransform {
  transform(values: any[]) {
    if (!values.every((v) => isObjectId(v)))
      throw new BadRequestException('Invalid objectId');
    return values;
  }
}
