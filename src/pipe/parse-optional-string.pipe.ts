import { ArgumentMetadata, HttpStatus, Injectable, Optional, ParseEnumPipe, ParseEnumPipeOptions, PipeTransform } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class ParseOptionalStringPipe implements PipeTransform<string | number | boolean, Promise<string>> {
  constructor(@Optional() protected readonly options?: { minLength?: number; maxLength?: number }) {
    options = options || {};
    if (options.minLength && options.maxLength && options.minLength >= options.maxLength) {
      throw new Error(`"ParseStringOptionalPipe" requires "minLength" argument less than or equal to "maxLength" argument.`);
    }
  }

  async transform(value: string | number | boolean, metadata: ArgumentMetadata): Promise<string> {
    if (!value) {
      return undefined;
    }
    value = value.toString();
    if (typeof value === 'string') {
      if (!this.options) {
        return value;
      }
      if (this.options.minLength && value.length < this.options.minLength) {
        throw new HttpErrorByCode[HttpStatus.BAD_REQUEST](`[${value}] is Invalid value. must be less than ${this.options.minLength}.`);
      }
      if (this.options.maxLength && value.length > this.options.maxLength) {
        throw new HttpErrorByCode[HttpStatus.BAD_REQUEST](`[${value}] is Invalid value. must be ${this.options.maxLength} or above.`);
      }
      return value;
    }
    throw new HttpErrorByCode[HttpStatus.BAD_REQUEST](`[${JSON.stringify(value)}] is Invalid value.`);
  }
}
