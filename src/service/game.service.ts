import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameDto } from 'src/endpoint/dto/game.dto';
import { ResultSaveDto } from 'src/endpoint/dto/result.save.dto';
import { GameEntity } from 'src/typeorm/entity/game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(@InjectRepository(GameEntity) private readonly gameRepository: Repository<GameEntity>) {}

  async save(game: GameDto | GameDto[]): Promise<ResultSaveDto> {
    const gameList = Array.isArray(game) ? game : [game];

    for (const g of gameList) {
      const target = await this.gameRepository.findOne({
        where: { gameID: g.gameID },
      });
      await this.gameRepository.save({ ...target, ...g });
    }
    return { saveRow: gameList.length };
  }
}
