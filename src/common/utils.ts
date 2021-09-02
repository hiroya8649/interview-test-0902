import * as _ from 'lodash';
import * as mongoose from 'mongoose';

export const removeUndefinedForObject = (
  obj: Record<string, any>,
): Record<string, any> => {
  const cloned = Object.assign({}, obj);
  return _.omitBy(cloned, _.isUndefined);
};

export const isObjectId = (id: any) => {
  return mongoose.Types.ObjectId.isValid(id);
};
