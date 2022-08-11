import { Body, Controller, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiProperty, ApiPropertyOptional, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, MaxLength, Min } from 'class-validator';
import { ParseArrayEnumPipe } from 'src/pipe/parse-array-enum.pipe';
import { ParseIntBetweenPipe } from 'src/pipe/parse-int-between.pipe';
import { UserService } from 'src/service/user.service';

enum EPart {
  name = 'name',
  kana = 'kana',
  kanaAsc = 'kanaAsc',
}

// https://docs.nestjs.com/openapi/decorators

class findAllQuery {
  @ApiProperty({ name: 'part', enum: Object.values(EPart), type: 'string', isArray: true, required: true })
  page: EPart[];
  @ApiProperty({ name: 'searchKana', example: 'タナカ', required: false })
  @IsOptional()
  @MaxLength(10)
  searchKana: string;
  @ApiPropertyOptional({ name: 'maxResults', example: 10, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
  maxResults: number = 11;
}

@ApiTags('sample-request')
@Controller('sample-request')
export class SampleRequestController {
  constructor() {}

  @ApiOperation({
    summary: '@Param()では全てのデータを取得できる',
    description: `@Param()では全てのデータを取得できるが、any型となるため、property名に気をつけないといけない。またSwagger UPから入力パラメータが指定することができない。`,
  })
  @Get('param-bad-pattern/:key/:id')
  async requestParamBadPattern(@Param() param: any): Promise<string> {
    return JSON.stringify(param);
  }

  @ApiOperation({
    summary: '数値を取得する(validationなし)',
    description: `validationなしで数値を取得しようとすると、数値以外が入力された場合にNaNになる。`,
  })
  @Get('param-pattern/number/:key')
  async param1(@Param('key') key: number): Promise<string> {
    return `key = ${key}`;
  }

  @ApiOperation({
    summary: '数値を取得する(validationあり)',
    description: `ParseIntPipeを設定し、数値のみを受け付ける。数値以外を送信すると400 Bad Requestを返す。`,
  })
  @Get('param-pattern/number-validation/:id')
  async param2(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return `id = ${id}`;
  }

  @ApiOperation({
    summary: '文字を取得する',
    description: `文字列はどのような形でも取得できるため、validationの必要はないだろう。`,
  })
  @Get('param-pattern/string/:key')
  async param3(@Param('key') key: string): Promise<string> {
    return `key = ${key}`;
  }

  @ApiOperation({
    summary: '複数の@Param(:key)の使用方法',
    description: `特定箇所のendpointの取得2`,
  })
  @Get('param-pattern/:key/hoge/:id')
  async param4(@Param('key') key: string, @Param('id') id: string): Promise<string> {
    return `key = ${key}, data = ${id}`;
  }



  @ApiOperation({
    summary: 'Paramにvalidationを設定する(数値と文字)',
    description: `文字の検証は空文字だとURLが成立しないためvalidation自体が存在しない`,
  })
  @Get('param-pattern-validate/:id/:data')
  async param5(@Param('id', ParseIntPipe) id: number, @Param('data') data: string): Promise<string> {
    return `id = ${id}, data = ${data}`;
  }
}
