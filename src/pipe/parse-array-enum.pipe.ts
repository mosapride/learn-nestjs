import { ArgumentMetadata, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class ParseArrayEnumPipe<T = any> implements PipeTransform<T> {
  constructor(protected readonly enumType: T, protected readonly options?: { optional?: boolean }) {
    options = options || {};
    if (!enumType) {
      throw new Error(`"ParseArrayEnumPipe" requires "enumType" argument specified (to validate input values).`);
    }
  }

  async transform(value: any, metadata: ArgumentMetadata): Promise<string[]> {
    if (!value && value !== 0) {
      if (this.options.optional) {
        return [];
      }
      throw new HttpErrorByCode[HttpStatus.BAD_REQUEST](`[${metadata.data}] is required.`);
    }

    let valueArray: string[] = [];
    if (typeof value === 'string') {
      const separator = new RegExp(`,| `, 'g');
      valueArray = value.split(separator);
    } else if (Array.isArray(value)) {
      valueArray = value;
    } else {
      throw new HttpErrorByCode[HttpStatus.BAD_REQUEST](`Validation failed (enum string is expected)  / valueType = string or string[]`);
    }

    valueArray = valueArray.filter((item, i, self) => {
      return self.indexOf(item) === i && item.length > 0;
    });
    for (const v of valueArray) {
      if (!this.isEnum(v)) {
        throw new HttpErrorByCode[HttpStatus.BAD_REQUEST](`Validation failed (enum string is expected) = [${v}]`);
      }
    }

    return valueArray;
  }

  protected isEnum(value: string): boolean {
    const enumValues = Object.keys(this.enumType).map((item) => this.enumType[item]);
    return enumValues.includes(value);
  }
}
