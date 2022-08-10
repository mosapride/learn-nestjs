import { Body, Controller, Post } from '@nestjs/common';
import { HasGameService } from 'src/service/has.game.service';
import { HasGameDto } from './dto/has-game.dto';
import { ResultSaveDto } from './dto/result-save.dto';

@Controller('has-game')
export class HasGameController {
  constructor(private readonly hasGameService: HasGameService) {}

  @Post()
  async save(@Body() data: HasGameDto | HasGameDto[]): Promise<ResultSaveDto> {
    return await this.hasGameService.save(data);
  }
}
