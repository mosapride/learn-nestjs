import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HasGameDto } from 'src/endpoint/dto/has-game.dto';
import { ResultSaveDto } from 'src/endpoint/dto/result-save.dto';
import { HasGameEntity } from 'src/typeorm/entity/has-game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HasGameService {
  constructor(@InjectRepository(HasGameEntity) private readonly hasGameRepository: Repository<HasGameEntity>) {}

  async save(user: HasGameDto | HasGameDto[]): Promise<ResultSaveDto> {
    const hasGameList = Array.isArray(user) ? user : [user];

    for (const hg of hasGameList) {
      let target: HasGameEntity | null = null;
      if (hg.id) {
        target = await this.hasGameRepository.findOne({
          where: { id: hg.id },
        });
      }
      if (target) {
        await this.hasGameRepository.update(target, hg);
      } else {
        await this.hasGameRepository.save(hg);
      }
    }
    return { saveRow: hasGameList.length };
  }
}
