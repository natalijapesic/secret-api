import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Exam, User } from 'core/entities';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature({
      entities: [User, Exam],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}
