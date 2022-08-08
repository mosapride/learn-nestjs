import { Body, Controller, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import { ParseArrayEnumPipe } from 'src/pipe/parse-array-enum.pipe';
import { ParseIntBetweenPipe } from 'src/pipe/parse-int-between.pipe';
import { UserService } from 'src/service/user.service';
import { ResultSaveDto } from './dto/result.save.dto';
import { ERelation, UserDto } from './dto/user.dto';

export enum USER_PART {
  address = 'address',
  game = 'game',
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async save(@Body() data: UserDto | UserDto[]): Promise<ResultSaveDto> {
    return await this.userService.save(data);
  }

  @Get()
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
