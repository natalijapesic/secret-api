import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'modules/auth/auth.module';
import { ExamModule } from 'modules/exam/exam.module';
import { LocationModule } from 'modules/location/location.module';
import { OrmModule } from 'modules/orm/orm.module';
import { UserModule } from 'modules/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env', '.env'],
      isGlobal: true,
    }),
    AuthModule,
    LocationModule,
    OrmModule,
    UserModule,
    ExamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
