import { HasGameDto } from 'src/endpoint/dto/has.game.dto';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommonDate } from '../mix/data.entity';
import { GameEntity } from './game.entity';
import { UserEntity } from './user.entity';

@Entity('has_game')
export class HasGameEntity extends CommonDate implements HasGameDto {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'user_id' })
  userID: number;
  @Column({ name: 'game_id' })
  gameID: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userID' })
  user: UserEntity;

  @ManyToOne(() => GameEntity)
  @JoinColumn({ name: 'game_id', referencedColumnName: 'gameID' })
  game: GameEntity;
}
