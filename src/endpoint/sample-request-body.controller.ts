import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReqUser } from './dto/query-param.dto';

@ApiTags('sample-body')
@Controller('sample-body')
export class SampleRequestBodyController {
  constructor() {}

  @ApiOperation({
    summary: 'class-validatorを使って安全性を高める',
    description: `@Bodyと@ApiBodyを使って、クラスをバリデーションする。`,
  })
  @Post('body1')
  async body1(@Body() body: ReqUser): Promise<ReqUser> {
    return body;
  }
}
