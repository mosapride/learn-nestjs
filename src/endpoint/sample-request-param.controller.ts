import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('sample-request')
@Controller('sample-request')
export class SampleRequestParamController {
  constructor() {}

  /// ---- @Paramパラメータ ----
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
    description: `ParseIntPipeを設定し、数値のみを受け付ける。数値以外を受け取ると400 Bad Requestを返す。`,
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
    summary: '複数のParamパラメータ',
    description: `@Paramはたぶん、これが一番安定。`,
  })
  @Get('param-pattern-validate/:id/hoge/:data')
  async param4(@Param('id', ParseIntPipe) id: number, @Param('data') data: string): Promise<string> {
    return `id = ${id}, data = ${data}`;
  }
}
