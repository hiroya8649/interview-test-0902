import { registerDecorator, ValidationOptions } from 'class-validator';
import { Types } from 'mongoose';

export function IsObjectId(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: Record<any, any>, propertyName: string) => {
    registerDecorator({
      name: 'isObjectId',
      target: object.constructor,
      propertyName,
      options: {
        message: `${propertyName} is not valid ObjectId`,
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return (
            Types.ObjectId.isValid(value) &&
            Types.ObjectId(value).toString() == value
          );
        },
      },
    });
  };
}
