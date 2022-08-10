import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length, MaxLength } from 'class-validator';
import { UserDto } from '../dto/user.dto';

const nameMaxLength = 20;

export class ValidationUser implements UserDto {
  @ApiProperty()
  userID: number;

  @ApiProperty({ required: true, example: '田中 太郎', maxLength: 10 })
  @IsOptional()
  @MaxLength(10, {
    // here, $constraint1 will be replaced with "50", and $value with actual supplied value
    message: 'name is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  name: string;

  @ApiProperty({ required: true, example: 'タナカ タロウ', maxLength: nameMaxLength })
  @IsOptional()
  @MaxLength(nameMaxLength)
  kana: string;

  @ApiProperty({ required: true, example: 'ﾀﾅｶ ﾀﾛｳ', maxLength: 20 })
  @IsOptional()
  @MaxLength(20)
  kanaAsc: string;

  @ApiProperty({ required: true, example: '1010046', minLength: 7, maxLength: 7 })
  @Length(7, 7)
  addressZipCode: string;
}

export class PostUser extends OmitType(ValidationUser, ['userID'] as const) {}
