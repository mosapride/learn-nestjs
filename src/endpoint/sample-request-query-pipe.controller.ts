import { Controller, DefaultValuePipe, Get, ParseArrayPipe, ParseBoolPipe, ParseEnumPipe, ParseIntPipe, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { number, string } from 'joi';
import { ParseArrayEnumPipe } from 'src/pipe/parse-array-enum.pipe';
import { ParseArrayNumberPipe } from 'src/pipe/parse-array-number.pipe';
import { ParseBetweenNumberPipe } from 'src/pipe/parse-between-number.pipe';
import { ParseNumberPipe } from 'src/pipe/parse-number.pipe';
import { ParseOptionalStringPipe } from 'src/pipe/parse-optional-string.pipe';
import { ParseStringPipe } from 'src/pipe/parse-string.pipe';

enum EnumSample {
  A = 'A',
  b = 'b',
  C = 'C',
}

enum EnumClass {
  AAA = 'AAA',
  BBB = 'BBB',
  CCC = 'CCC',
}

@ApiTags('sample-query')
@Controller('sample-query')
export class SampleRequestQueryPipeController {
  constructor() {}
  /// ---- @Queryパラメータ ----

  // https://github.com/nestjs/swagger/issues/30

  @Get('query1')
  @ApiQuery({ name: 'str_key1', description: '省略不可な文字列', required: true })
  @ApiQuery({ name: 'str_key2', description: '省略可能な文字列', required: false })
  @ApiQuery({ name: 'int_key1', description: '省略不可な数値', required: true })
  @ApiQuery({ name: 'int_key2', description: '省略可能な数値', required: false })
  async paramQuery1(
    @Query('str_key1') str_key1: string,
    @Query('str_key2') str_key2: string | undefined,
    @Query('int_key1', ParseIntPipe) int_key1: number,
    @Query('int_key2', new DefaultValuePipe(0), ParseIntPipe) int_key2: number,
  ): Promise<any> {
    return {
      str_key1,
      str_key2,
      int_key1,
      int_key2,
    };
  }

  @Get('query2')
  @ApiQuery({ name: 'str_key1', description: '省略不可な文字列', required: true })
  @ApiQuery({ name: 'str_key2', description: '省略可能な文字列', required: false })
  @ApiQuery({ name: 'str_key2', description: '省略可能な文字列', required: false })
  @ApiQuery({ name: 'int_key1', description: '省略不可な数値', required: false })
  @ApiQuery({ name: 'int_key2', description: '省略可能な数値', required: false })
  async paramQuery2(
    @Query('str_key1') str_key1: string,
    @Query('str_key2') str_key2: string,
    @Query('str_key3') str_key3?: string,
    @Query('int_key1') int_key1?: number,
    @Query('int_key2') int_key2?: number,
  ): Promise<any> {
    return {
      str_key1,
      str_key2,
      str_key3,
      int_key1,
      int_key2,
    };
  }

  @Get('query3')
  @ApiQuery({ name: 'str_key1', description: '省略不可な文字列', required: true })
  @ApiQuery({ name: 'str_key2', description: '省略可能な文字列', required: false })
  @ApiQuery({ name: 'str_key2', description: '省略可能な文字列', required: false })
  @ApiQuery({ name: 'int_key1', description: '省略不可な数値', required: false })
  @ApiQuery({ name: 'int_key2', description: '省略可能な数値', required: false })
  async paramQuery3(
    @Query() query: any,
    @Query('str_key1') str_key1: string,
    @Query('str_key2') str_key2: string,
    @Query('str_key3') str_key3?: string,
    @Query('int_key1') int_key1?: number,
    @Query('int_key2') int_key2?: number,
  ): Promise<any> {
    console.log(query);
    return {
      query: JSON.stringify(query),
      str_key1,
      str_key2,
      str_key3,
      int_key1,
      int_key2,
    };
  }

  @Get('query4')
  @ApiQuery({ name: 'str_key1', description: '省略可能な文字列', required: false })
  @ApiQuery({ name: 'str_key2', description: '省略可能な文字列', required: false })
  async paramQuery4(
    @Query() query: any,
    @Query('str_key1', ParseOptionalStringPipe) str_key1?: string,
    @Query('str_key2', new ParseOptionalStringPipe({ minLength: 1, maxLength: 10 })) str_key2?: string,
  ): Promise<any> {
    console.log(query);
    return {
      str_key1,
      str_key2,
    };
  }

  @Get('query5')
  @ApiQuery({ name: 'key', required: true })
  async paramQuery5(@Query('key', ParseStringPipe) val: string): Promise<any> {
    return {
      val,
    };
  }

  @Get('query25')
  @ApiQuery({ name: 'key' })
  async paramQuery25(@Query('key', ParseStringPipe) val: string): Promise<any> {
    return {
      val,
    };
  }

  @Get('query6')
  @ApiQuery({ name: 'key', isArray: true, required: true })
  async paramQuery6(@Query('key', ParseStringPipe, ParseArrayPipe) val: string[]): Promise<any> {
    return {
      val,
    };
  }

  @Get('query26')
  @ApiQuery({ name: 'key', required: true })
  async paramQuery26(@Query('key', ParseStringPipe, ParseArrayPipe) val: string[]): Promise<any> {
    return {
      val,
    };
  }

  @Get('query7')
  @ApiQuery({ name: 'key', enum: Object.values(EnumSample), required: false })
  async paramQuery7(@Query('key', new ParseEnumPipe(EnumSample)) val: EnumSample): Promise<any> {
    return {
      val,
    };
  }

  @Get('query27')
  @ApiQuery({ name: 'key', enum: EnumSample, required: false })
  async paramQuery27(@Query('key', new ParseEnumPipe(EnumSample)) val: EnumSample): Promise<any> {
    return {
      val,
    };
  }

  @Get('query8')
  @ApiQuery({ name: 'key', type: [String], enum: EnumSample, isArray: true, required: false })
  async paramQuery8(@Query('key', new ParseArrayEnumPipe(EnumSample, { optional: false })) val: EnumSample[]): Promise<any> {
    return {
      val,
    };
  }

  @Get('query28')
  @ApiQuery({ name: 'key', enum: EnumSample, isArray: true, required: false })
  async paramQuery28(@Query('key', new ParseArrayEnumPipe(EnumSample, { optional: false })) val: EnumSample[]): Promise<any> {
    return {
      val,
    };
  }

  @Get('query9')
  @ApiQuery({ name: 'key', required: false })
  async paramQuery9(@Query('key', new ParseNumberPipe({ optional: false })) val: number): Promise<any> {
    return {
      val,
    };
  }

  @Get('query10')
  @ApiQuery({ name: 'key', type: Number, isArray: true, required: true })
  async paramQuery10(@Query('key', new ParseArrayNumberPipe({ empty: false })) val: number[]): Promise<any> {
    return {
      val,
    };
  }

  /**
   * デフォルト値
   * @param val
   * @returns
   */
  @Get('query11')
  @ApiQuery({ name: 'key', enum: Object.values(EnumSample), required: false })
  async paramQuery11(@Query('key', new DefaultValuePipe(EnumSample.A), new ParseEnumPipe(EnumSample)) val: EnumSample): Promise<any> {
    return {
      val,
    };
  }

  @Get('query12')
  @ApiQuery({ name: 'key', type: [String], enum: EnumSample, isArray: true, required: false })
  async paramQuery12(
    @Query('key', new DefaultValuePipe(EnumSample.A), new ParseArrayEnumPipe(EnumSample, { optional: false })) val: EnumSample[],
  ): Promise<any> {
    return {
      val,
    };
  }

  @Get('query13')
  @ApiQuery({ name: 'key', required: false })
  async paramQuery13(@Query('key') val: string | undefined): Promise<any> {
    console.log(val);
    return {
      val,
    };
  }

  @Get('query14')
  @ApiQuery({ name: 'key', isArray: true, required: false })
  async paramQuery14(@Query('key', new DefaultValuePipe([])) val: string[]): Promise<any> {
    console.log(val);
    return {
      val,
    };
  }

  @Get('query15')
  @ApiQuery({ name: 'key', required: false })
  async paramQuery15(@Query('key', new ParseNumberPipe({ optional: true })) val: number | undefined): Promise<any> {
    console.log(val);
    return {
      val,
    };
  }

  @Get('query16')
  @ApiQuery({ name: 'key', type: Number, isArray: true, required: false })
  async paramQuery16(@Query('key', new ParseArrayNumberPipe({ empty: true })) val: number[]): Promise<any> {
    console.log(val);
    return {
      val,
    };
  }

  @Get('query17')
  @ApiQuery({ name: 'key', enum: Object.values(EnumClass), required: false })
  async paramQuery17(@Query('key', new DefaultValuePipe(EnumClass.AAA), new ParseEnumPipe(EnumClass)) val: EnumClass): Promise<any> {
    console.log(val);
    return {
      val,
    };
  }

  @Get('query18')
  @ApiQuery({ name: 'key', type: [String], enum: EnumClass, isArray: true, required: false })
  async paramQuery18(
    @Query('key', new DefaultValuePipe([EnumClass.AAA]), new ParseArrayEnumPipe(EnumClass, { optional: false })) val: EnumClass[],
  ): Promise<any> {
    console.log(val);
    return {
      val,
    };
  }

  @Get('query19')
  @ApiQuery({ name: 'key', type: [String], enum: EnumClass, isArray: true, required: false })
  async paramQuery19(@Query('key', new ParseArrayEnumPipe(EnumClass, { optional: true })) val: EnumClass[]): Promise<any> {
    console.log(val);
    return {
      val,
    };
  }

  @Get('query20')
  @ApiQuery({
    name: 'key',
    required: false,
    schema: { minimum: 1, maximum: 99, exclusiveMaximum: true, exclusiveMinimum: true, default: 10 },
  })
  async paramQuery20(@Query('key', new ParseBetweenNumberPipe(10, 1, 99)) val: number): Promise<any> {
    console.log(val);
    return {
      val,
    };
  }

  @Get('query21')
  @ApiQuery({ name: 'key',required: false })
  async paramQuery21(@Query('key', ParseBoolPipe) val: boolean): Promise<any> {
    return {
      val,
    };
  }
}
