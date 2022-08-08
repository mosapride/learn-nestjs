import { ArgumentMetadata, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class ParseIntBetweenPipe implements PipeTransform {
  constructor(protected readonly defaultVal: number, protected readonly min: number, protected readonly max: number) {
    if (min >= max) {
      throw new Error(`"ParseIntBetweenPipe" requires "min" argument less than "max" argument.`);
    }
  }

  async transform(value: any, metadata: ArgumentMetadata): Promise<number> {
    if (!value) {
      return this.defaultVal;
    }
    if (!Number.isInteger(+value)) {
      throw new HttpErrorByCode[HttpStatus.BAD_REQUEST](`[${value}] is Invalid value.`);
    }
    if (+value < this.min || +value > this.max) {
      throw new HttpErrorByCode[HttpStatus.BAD_REQUEST](`[${value}] is Invalid value.`);
    }
    return +value;
  }
}
