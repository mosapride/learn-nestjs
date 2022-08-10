import { Body, Controller, Post } from '@nestjs/common';
import { GameService } from 'src/service/game.service';
import { GameDto } from './dto/game.dto';
import { ResultSaveDto } from './dto/result-save.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  async save(@Body() data: GameDto | GameDto[]): Promise<ResultSaveDto> {
    return await this.gameService.save(data);
  }
}
