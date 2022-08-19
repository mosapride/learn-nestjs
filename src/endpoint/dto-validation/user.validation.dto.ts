import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, isEmpty, IsOptional, Length, Matches, MaxLength, MinLength, ValidateIf } from 'class-validator';
import { UserDto } from '../dto/user.dto';

const nameMaxLength = 20;

export class ValidationUser implements Omit<UserDto, 'userID' | 'kanaAsc'> {
  @ApiProperty({ required: true, example: '田中 太郎', maxLength: 10 })
  @MaxLength(10, {
    // here, $constraint1 will be replaced with "50", and $value with actual supplied value
    message: 'name is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  name: string;

  @ApiProperty({ example: 'タナカ タロウ' })
  @IsOptional()
  @MaxLength(nameMaxLength)
  kana: string;

  @ApiProperty({ example: 'ﾀﾅｶ ﾀﾛｳ' })
  @IsOptional()
  @MinLength(5)
  @MaxLength(20)
  kanaAsc?: string;

  @ApiProperty({ example: '1010024' })
  @IsOptional()
  @Length(7)
  addressZipCode: string;
}
