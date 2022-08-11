import { ApiProperty } from '@nestjs/swagger';
import { Length, Matches, MaxLength } from 'class-validator';
import { UserDto } from '../dto/user.dto';

const nameMaxLength = 20;

export class ValidationUser implements Omit<UserDto, 'userID'> {
  @ApiProperty({ required: true, example: '田中 太郎', maxLength: 10 })
  @MaxLength(10, {
    // here, $constraint1 will be replaced with "50", and $value with actual supplied value
    message: 'name is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  name: string;

  @ApiProperty({ required: true, example: 'タナカ タロウ', maxLength: nameMaxLength })
  @MaxLength(nameMaxLength)
  kana: string;

  @ApiProperty({ required: true, example: 'ﾀﾅｶ ﾀﾛｳ', maxLength: 20 })
  @MaxLength(20)
  kanaAsc: string;

  @ApiProperty({ required: true, example: '1010024'})
  @Length(7)
  addressZipCode: string;
}
