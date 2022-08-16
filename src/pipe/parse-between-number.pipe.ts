import { ArgumentMetadata, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class ParseBetweenNumberPipe implements PipeTransform<string, number> {
  /**
   * 最小値、最大値の制限のある数値を受け取るパイプ.
   *
   * 初期値は任意であり、Queryの宣言がない場合、数値以外の文字データが入力されると、デフォルト値が使用される.
   *
   * ```
   * find(@Query('maxResults', new ParseBetweenNumberPipe(10, 1, 50)) maxResults: number) {
   *   console.log({maxResults});
   * }
   * ```
   *
   * @param defaultValue デフォルト値
   * @param min 最小値
   * @param max 最大値
   */
  constructor(protected readonly defaultValue: number, protected readonly min: number, protected readonly max: number) {
    if (min >= max) {
      throw new Error(`"ParseBetweenNumberPipe" requires "min" argument less than "max" argument.`);
    }
  }

  transform(value: any, metadata: ArgumentMetadata): number {
    if (!value && value !== 0) {
      return this.defaultValue;
    }
    const isNumeric = ['string', 'number'].includes(typeof value) && !isNaN(parseFloat(value)) && isFinite(value as any);
    if (isNumeric) {
      if (+value < this.min || +value > this.max) {
        throw new HttpErrorByCode[HttpStatus.BAD_REQUEST](`[${value}] is Invalid value. [${this.min} <= value <= ${this.max}]`);
      }
    } else {
      throw new HttpErrorByCode[HttpStatus.BAD_REQUEST](`[${metadata.data}] Validation failed (numeric string is expected)`);
    }
    return +value;
  }
}
