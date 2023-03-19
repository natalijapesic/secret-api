import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { LocationInfo, User } from 'core/entities';
import { UserService } from 'modules/user/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [MikroOrmModule.forFeature([User, LocationInfo])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
