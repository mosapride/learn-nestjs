import { HttpStatus } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

const SEPARATOR = /,| /g;

export enum EnumClass {
  AAA = 'AAA',
  BBB = 'BBB',
  CCC = 'CCC',
  DDD = 'DDD',
}

export class ReqSampleValidator {
  /**
   * 省略不可能
   * string
   */
  @ApiProperty()
  @IsNotEmpty()
  key1: string;

  /**
   * 省略不可能
   * string[]
   */
  @ApiProperty()
  @IsNotEmpty()
  @Transform((v) => {
    if (Array.isArray(v.value)) return v.value;
    return v.value.split(/,| /g);
  })
  key2: string[];

  /**
   * 省略不可能
   * enum
   */
  @ApiProperty()
  @IsEnum(EnumClass)
  key3: EnumClass;

  /**
   * 省略不可能
   * enum[]
   */
  @ApiProperty({ enum: Object.values(EnumClass) })
  @Transform((v) => {
    if (Array.isArray(v.value)) return v.value;
    return v.value.split(SEPARATOR);
  })
  @IsEnum(EnumClass, { each: true })
  key4: EnumClass[];

  /**
   * 省略不可能
   * number
   *
   * ```ts
   * endpoint        // 400 ERROR
   * endpoint&key5=  // 0
   * ```
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  key5: number;

  /**
   * 省略不可能
   * number[]
   */
  @ApiProperty()
  @IsNotEmpty()
  @Transform((val) => {
    const v = val.obj[val.key];
    if (Array.isArray(v)) return v.map((v) => +v);
    if (typeof v === 'number') return [v];
    if (typeof v === 'string') return v.split(SEPARATOR).map((v) => +v);
    throw new HttpErrorByCode[HttpStatus.BAD_REQUEST](`[${val}] Validation failed (An array of numbers is expected.)`);
  })
  @IsNumber({}, { each: true })
  @Type(() => Number)
  key6: number[];
}

export class ReqSampleValidatorOptional {
  /**
   * 省略可能
   * string
   */
  @ApiPropertyOptional()
  key1?: string = undefined;

  /**
   * 省略可能
   * string
   */
  @ApiPropertyOptional()
  @IsArray()
  @Transform((v) => {
    if (Array.isArray(v.value)) return v.value;
    return v.value.split(/,| /g);
  })
  key2: string[] = [];

  /**
   * 省略可能
   * enum
   */
  @ApiPropertyOptional()
  @IsEnum(EnumClass)
  key3: EnumClass = EnumClass.AAA;

  /**
   * 省略可能
   * enum[]
   */
  @ApiPropertyOptional({ enum: Object.values(EnumClass) })
  @Transform((v) => {
    if (Array.isArray(v.value)) return v.value;
    return v.value.split(SEPARATOR);
  })
  @IsEnum(EnumClass, { each: true })
  key4: EnumClass[] = [];

  /**
   * 省略可能
   * enum[]
   */
  @ApiPropertyOptional({ enum: Object.values(EnumClass) })
  @Transform((v) => {
    if (Array.isArray(v.value)) return v.value;
    return v.value.split(SEPARATOR);
  })
  @IsEnum(EnumClass, { each: true })
  key5: EnumClass[] = [EnumClass.AAA];

  /**
   * 省略可能
   * number
   */
  @ApiPropertyOptional()
  @Transform((val) => {
    if (isNaN(val.value)) {
      throw new HttpErrorByCode[HttpStatus.BAD_REQUEST](`[${val.value}] Validation failed (An numbers is expected.)`);
    }
    return +val.value
  })
  key6?: number = undefined;

  /**
   * 省略可能
   * number[]
   */
  @ApiPropertyOptional()
  @Transform((val) => {
    const v = val.obj[val.key];
    if (Array.isArray(v)) return v.map((v) => +v);
    if (typeof v === 'number') return [v];
    if (typeof v === 'string') return v.split(SEPARATOR).map((v) => +v);
    throw new HttpErrorByCode[HttpStatus.BAD_REQUEST](`[${val}] Validation failed (An array of numbers is expected.)`);
  })
  @IsNumber({}, { each: true })
  @Type(() => Number)
  key7: number[] = [];
}
