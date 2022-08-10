import { GameDto } from './game.dto';
import { UserDto } from './user.dto';

export interface HasGameDto {
  readonly id: number;
  userID: number;
  gameID: number;
  user?: UserDto;
  game?: GameDto;
};
