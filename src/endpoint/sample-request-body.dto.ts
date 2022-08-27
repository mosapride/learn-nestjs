import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsISO8601, IsNotEmpty, IsOptional, Max, MaxLength, MinLength, ValidateIf, ValidateNested } from 'class-validator';

export enum EnumClass {
  AAA = 'AAA',
  BBB = 'BBB',
  CCC = 'CCC',
  DDD = 'DDD',
}

export class Nest1Sample {
  @ApiProperty()
  @MaxLength(10)
  key1: string;

  @ApiProperty()
  @MinLength(10)
  key2: string;
}

export class SampleBody {
  /**
   * stringの文字列
   */
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(10)
  key1: string;

  /**
   * stringの文字列の配列
   */
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(10, {
    each: true,
  })
  key2: string[];

  /**
   * number型
   */
  @ApiProperty()
  @IsNotEmpty()
  @Max(10)
  key3: number;

  /**
   * stringの文字列の配列
   */
  @ApiProperty()
  @IsNotEmpty()
  @Max(10, {
    each: true,
  })
  key4: number[];

  /**
   * ISO8601形式の日付
   */
  @ApiProperty({ example: '2022-08-23T14:47:32.899Z' })
  @IsNotEmpty()
  @IsISO8601()
  key5: string;

  @ApiPropertyOptional({ enum: Object.values(EnumClass) })
  @IsOptional()
  @IsEnum(EnumClass)
  key6?: EnumClass;

  @ApiPropertyOptional({ enum: Object.values(EnumClass) })
  @IsOptional()
  @IsEnum(EnumClass, { each: true })
  key7?: EnumClass[] = [];

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Nest1Sample)
  nestClass: Nest1Sample;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Nest1Sample)
  @IsNotEmpty()
  nestClassArray: Nest1Sample[];

  @ApiPropertyOptional()
  @IsOptional()
  condition1?: string;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => {
    if (object.condition1) return true;
    return false;
  })
  @IsNotEmpty()
  condition2?: string;

  @ApiProperty()
  keyBatPattern1: {
    // @ApiProperty()  これはできない。
    // @MaxLength(10)  これはできない。
    name: string;
    body: string;

    hoge: {
      twitterID: number;
    };
  };
}

