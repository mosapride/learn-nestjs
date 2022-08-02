import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/service/user.service';
import { ResultSaveDto } from './dto/result.save.dto';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async save(@Body() data: UserDto | UserDto[]): Promise<ResultSaveDto> {
    return await this.userService.save(data);
  }
}
