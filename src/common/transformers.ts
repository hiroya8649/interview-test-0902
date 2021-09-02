/* eslint-disable @typescript-eslint/no-namespace */
import { BadRequestException } from '@nestjs/common';

export namespace Transformer {
  export const stringToNumberArray = (v: string) => {
    try {
      return v.split(',').map((s) => parseInt(s, 10));
    } catch (error) {
      throw new BadRequestException(`Can not transform ${v} to number array`);
    }
  };
}
