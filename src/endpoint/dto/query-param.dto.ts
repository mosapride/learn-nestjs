import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, MaxLength, Min } from 'class-validator';

export enum EPart {
  name = 'name',
  kana = 'kana',
  kanaAsc = 'kanaAsc',
}

export class ReqUser {
  @IsEnum(EPart, { each: true })
  part: EPart[];

  @IsOptional()
  @MaxLength(10)
  searchKana: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
  maxResults: number = 11;
}
