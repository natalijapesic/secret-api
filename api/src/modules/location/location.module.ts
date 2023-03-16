import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { LocationInfo } from 'core/entities';

@Module({
  imports: [MikroOrmModule.forFeature([LocationInfo])],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
