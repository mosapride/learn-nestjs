import { Body, Controller, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiPropertyOptional, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, MaxLength, Min } from 'class-validator';
import { ParseArrayEnumPipe } from 'src/pipe/parse-array-enum.pipe';
import { ParseBetweenNumberPipe } from 'src/pipe/parse-between-number.pipe';
import { UserService } from 'src/service/user.service';
import { ValidationUser } from './dto-validation/user.validation.dto';
import { ERelation, UserDto } from './dto/user.dto';

class findAllQuery {
  @ApiProperty({ enum: Object.values(ERelation), type: 'string', isArray: true, required: true })
  page: ERelation[];
  @ApiProperty({ example: 'タナカ', required: false })
  @IsOptional()
  @MaxLength(10)
  searchKana: string;
  @ApiPropertyOptional({ example: 10, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
  maxResults: number = 11;
}

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('hoge')
  async findHoge(@Query() query: findAllQuery): Promise<string> {
    console.log(query);
    return 'this is test';
  }

  @Post()
  @ApiBody({ type: ValidationUser, isArray: true })
  async save(@Body(new ParseArrayPipe({ items: ValidationUser })) data: ValidationUser[]): Promise<string> {
    console.log(data);

    return 'this is test';
    // return await this.userService.save(data);
  }

  //description: 'リクエストデータ数(Min:1 , Max:100 , default:10)',
  @Get()
  @ApiQuery({ name: 'id', required: false , type:String })
  @ApiQuery({ name: 'part', description: '表示するパーツを増やすv', type: [String], enum: ERelation, isArray: true, required: true })
  @ApiQuery({ name: 'searchKana', example: 'タナカ', description: '名前のカナ検索', required: false })
  @ApiQuery({
    name: 'maxResults',
    required: false,
    schema: { minimum: 1, maximum: 100, exclusiveMaximum: true, exclusiveMinimum: true, default: 10 },
  })
  async findAll(
    @Query('id' , ParseIntPipe) id: number,
    @Query('part', new ParseArrayEnumPipe(ERelation, { optional: true, separator: ',' })) part: ERelation[],
    @Query('searchKana') searchKana: string | undefined,
    @Query('maxResults', new ParseBetweenNumberPipe(30, 1, 100)) maxResults: number,
    // ): Promise<UserDto[]> {
  ): Promise<any> {
    return { id, part, searchKana, maxResults };
    // return await this.userService.find(part, searchKana, maxResults);
  }

  @Get(':id')
  async findByID(
    @Param('id') id: number,
    @Query('part', new ParseArrayEnumPipe(ERelation, { optional: true, separator: ',' })) part: ERelation[],
  ): Promise<UserDto | {}> {
    return this.userService.findOne(id, part);
  }
}
