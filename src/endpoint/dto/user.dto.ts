import { AddressDto } from './address.dto';
import { HasGameDto } from './has.game.dto';

export interface UserDto {
  userID: number;
  name: string;
  kana: string;
  kanaAsc: string;
  addressZipCode: string;
  address?: AddressDto;
  hasGames?: HasGameDto[];
}

export enum ERelation {
  address = 'address',
  game = 'game',
}
