import { ArgumentMetadata, HttpStatus, Injectable, Optional, PipeTransform } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class ParseArrayNumberPipe implements PipeTransform<string | number | boolean, number[]> {
  constructor(@Optional() protected readonly options?: { empty?: boolean }) {
    options = options || {};
  }

  transform(value: any, metadata: ArgumentMetadata): number[] {
    if (value === undefined) {
      if (this.options.empty) {
        return [];
      } else {
        throw new HttpErrorByCode[HttpStatus.BAD_REQUEST](`[${metadata.data}] Validation failed (An array of numbers is expected.)`);
      }
    }
    value = Array.isArray(value) ? value : [value];

    for (const v of value) {
      if (Number.isNaN(v)) {
        throw new HttpErrorByCode[HttpStatus.BAD_REQUEST](`[${metadata.data}] Validation failed (An array of numbers is expected.)`);
      }
      const isNumeric = ['string', 'number'].includes(typeof v) && !isNaN(parseFloat(value)) && isFinite(+v);
      if (!isNumeric) {
        throw new HttpErrorByCode[HttpStatus.BAD_REQUEST](`[${metadata.data}] Validation failed (An array of numbers is expected.)`);
      }
    }

    return value.map((v) => +v);
  }
}
