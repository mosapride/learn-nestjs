import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultSaveDto } from 'src/endpoint/dto/result-save.dto';
import { ERelation, UserDto } from 'src/endpoint/dto/user.dto';
import { UserEntity } from 'src/typeorm/entity/user.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async save(user: UserDto | UserDto[]): Promise<ResultSaveDto> {
    const userList = Array.isArray(user) ? user : [user];

    for (const u of userList) {
      const target = await this.userRepository.findOne({
        where: { userID: u.userID },
      });
      if (target) {
        await this.userRepository.update(target, u);
      } else {
        await this.userRepository.save(u);
      }
    }
    return { saveRow: userList.length };
  }

  async find(part?: ERelation[], searchKana?: string | undefined, maxResults?: number | undefined): Promise<UserDto[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (searchKana) {
      queryBuilder.where('user.kana like :kana', { kana: `%${searchKana}%` });
    }
    for (const p of part) {
      switch (p) {
        case ERelation.address:
          queryBuilder.leftJoinAndSelect('user.address', 'address');
          break;
        case ERelation.game:
          queryBuilder.leftJoinAndSelect('user.hasGames', 'hasGames');
          queryBuilder.leftJoinAndSelect('hasGames.game', 'game');
          break;
      }
    }


    queryBuilder.take(maxResults ? maxResults : 10);

    return queryBuilder.getMany();
  }

  async findOne(id: number, part?: ERelation[]): Promise<UserDto | {}> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder.where('user.userID = :id', { id }).getOne();
    for (const p of part) {
      switch (p) {
        case ERelation.address:
          queryBuilder.leftJoinAndSelect('user.address', 'address');
          break;
        case ERelation.game:
          queryBuilder.leftJoinAndSelect('user.hasGames', 'hasGames');
          queryBuilder.leftJoinAndSelect('hasGames.game', 'game');
          break;
      }
    }
    return queryBuilder.getOne();
  }
}
