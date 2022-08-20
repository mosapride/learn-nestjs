import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { format } from 'util';
import { ReqSampleValidator, ReqSampleValidatorOptional } from './sample-request-query-class-validator.dto';

@ApiTags('sample-query-class')
@Controller('sample-query-class')
export class SampleRequestQueryClassValidatorController {
  @Get('required')
  async query1(@Query() query: ReqSampleValidator): Promise<any> {
    return query;
  }

  @Get('optional')
  async query2(@Query() query: ReqSampleValidatorOptional): Promise<any> {
    console.log(query);
    const v = format(query);
    return v;
  }
}
