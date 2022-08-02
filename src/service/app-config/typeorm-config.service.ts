import { TypeOrmModuleAsyncOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import * as getTypeOrmModuleOptions from  '../../util/typeorm-config';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleAsyncOptions {
    return getTypeOrmModuleOptions;
  }
}

