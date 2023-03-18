import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Exam, LocationInfo, User } from 'core/entities';

@Module({
  imports: [MikroOrmModule.forFeature([LocationInfo, Exam, User])],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
