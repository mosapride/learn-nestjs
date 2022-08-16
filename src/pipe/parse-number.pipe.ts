import { ArgumentMetadata, HttpStatus, Injectable, Optional, PipeTransform } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class ParseNumberPipe implements PipeTransform<string | number | boolean, number | undefined> {
  constructor(@Optional() protected readonly options?: { optional?: boolean }) {
    options = options || {};
  }

  transform(value: any, metadata: ArgumentMetadata): number | undefined {
    if (Number.isNaN(value)) {
      throw new HttpErrorByCode[HttpStatus.BAD_REQUEST](`[${metadata.data}] Validation failed (numeric string is expected)`);
    }
    if (!value && value !== 0) {
      if (this.options && this.options.optional) {
        return undefined;
      } else {
        throw new HttpErrorByCode[HttpStatus.BAD_REQUEST](`[${metadata?.data}] is required.`);
      }
    }

    const isNumeric = ['string', 'number'].includes(typeof value) && !isNaN(parseFloat(value)) && isFinite(+value);
    if (isNumeric) {
      return +value;
    }
    return undefined;
  }
}
