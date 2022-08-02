import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultSaveDto } from 'src/endpoint/dto/result.save.dto';
import { UserDto } from 'src/endpoint/dto/user.dto';
import { UserEntity } from 'src/typeorm/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async save(user: UserDto | UserDto[]): Promise<ResultSaveDto> {
    const userList = Array.isArray(user) ? user : [user];

    for (const u of userList) {
      const target = await this.userRepository.findOne({
        where: { userID: u.userID },
      });
      await this.userRepository.save({ ...target, ...u });
    }
    return { saveRow: userList.length };
  }
}
