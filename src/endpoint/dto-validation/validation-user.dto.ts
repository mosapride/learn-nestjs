import { OmitType } from '@nestjs/mapped-types';
import { IsInt, IsString, Max, Min } from 'class-validator';
import { UserDto } from '../dto/user.dto';

export class ValidationUser implements UserDto {
  @IsInt()
  userID: number;

  @IsString()
  @Max(255)
  name: string;

  @IsString()
  @Max(255)
  kana: string;

  @IsString()
  @Max(255)
  kanaAsc: string;

  @IsString()
  @Min(7)
  @Max(7)
  addressZipCode: string;
}

export class PostUser extends OmitType(ValidationUser, ['userID'] as const) {}
