import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressController } from './endpoint/address.controller';
import { GameController } from './endpoint/game.controller';
import { HasGameController } from './endpoint/has-game.controller';
import { SampleRequestBodyController } from './endpoint/sample-request-body.controller';
import { SampleRequestParamController } from './endpoint/sample-request-param.controller';
import { SampleRequestQueryController } from './endpoint/sample-request-query.controller';
import { UserController } from './endpoint/user.controller';
import { AddressService } from './service/address.service';
import { TypeOrmConfig } from './service/app-config/typeorm-config.service';
import { GameService } from './service/game.service';
import { HasGameService } from './service/has.game.service';
import { UserService } from './service/user.service';
import { AddressEntity } from './typeorm/entity/address.entity';
import { GameEntity } from './typeorm/entity/game.entity';
import { HasGameEntity } from './typeorm/entity/has-game.entity';
import { UserEntity } from './typeorm/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
    TypeOrmModule.forFeature([UserEntity, HasGameEntity, GameEntity, AddressEntity]),
  ],
  controllers: [
    AppController,
    UserController,
    GameController,
    AddressController,
    HasGameController,
    SampleRequestParamController,
    SampleRequestQueryController,
    SampleRequestBodyController,
  ],
  providers: [AppService, UserService, GameService, AddressService, HasGameService],
})
export class AppModule {}
