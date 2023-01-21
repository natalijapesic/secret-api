import { Module } from '@nestjs/common';
import { OrmModule } from 'modules/orm/orm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [OrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
