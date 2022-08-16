import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiPropertyOptional, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsOptional, Max, MaxLength, Min, ValidateNested } from 'class-validator';

enum EPart {
  name = 'name',
  kana = 'kana',
  kanaAsc = 'kanaAsc',
}

class ReqUser {
  @ApiProperty({ enum: Object.values(EPart), isArray: true, required: true })
  @IsEnum(EPart, { each: true })
  part: EPart[];

  @ApiProperty({ example: 'タナカ', required: false, maxLength: 10 })
  @IsOptional()
  @MaxLength(10)
  searchKana: string;

  @ApiPropertyOptional({ minimum: 1, maximum: 100, default: 11, example: 10, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
  maxResults: number = 11;
}

@ApiTags('sample-body')
@Controller('sample-body')
export class SampleRequestBodyController {
  constructor() {}

  @ApiOperation({
    summary: 'class-validatorを使って安全性を高める',
    description: `@Bodyと@ApiBodyを使って、クラスをバリデーションする。`,
  })
  @Post('body1')
  @ApiBody({ type: ReqUser })
  @ApiResponse({ type: ReqUser })
  async body1(@Body() body: ReqUser): Promise<ReqUser> {
    return body;
  }
}
