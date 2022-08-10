import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { ParseArrayEnumPipe } from 'src/pipe/parse-array-enum.pipe';
import { ParseIntBetweenPipe } from 'src/pipe/parse-int-between.pipe';
import { UserService } from 'src/service/user.service';
import { ValidationUser } from './dto-validation/user.validation.dto';
import { ERelation, UserDto } from './dto/user.dto';

export enum USER_PART {
  address = 'address',
  game = 'game',
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: ValidationUser, isArray: true })
  async save(@Body() data: ValidationUser): Promise<string> {
    return 'this is test';
    // return await this.userService.save(data);
  }

  @Get()
  @ApiQuery({ name: 'part', description: '表示するパーツを増やす', type: [String], enum: ERelation, isArray: true, required: false })
  @ApiQuery({ name: 'searchKana', example: 'タナカ', description: '名前のカナ検索', required: false })
  @ApiQuery({ name: 'maxResults', example: 10, description: 'リクエストデータ数(Min:1 , Max:100 , default:10)', required: false })
  async findAll(
    @Query('part', new ParseArrayEnumPipe(ERelation, { optional: true, separator: ',' })) part: ERelation[],
    @Query('searchKana') searchKana: string | undefined,
    @Query('maxResults', new ParseIntBetweenPipe(10, 1, 100)) maxResults: number,
  ): Promise<UserDto[]> {
    return await this.userService.find(part, searchKana, maxResults);
  }

  @Get(':id')
  async findByID(
    @Param('id') id: number,
    @Query('part', new ParseArrayEnumPipe(ERelation, { optional: true, separator: ',' })) part: ERelation[],
  ): Promise<UserDto | {}> {
    return this.userService.findOne(id, part);
  }
}
