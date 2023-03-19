import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocationInfo } from 'core/entities';
import { CreateLocation } from 'modules/location/dto/create-location.request';
import { UpdateLocation } from 'modules/location/dto/update-location.request';
import { LocationService } from 'modules/location/location.service';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async create(@Body() payload: CreateLocation): Promise<LocationInfo> {
    return await this.locationService.create(payload);
  }

  @Get()
  async findAll() {
    return await this.locationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LocationInfo> {
    return await this.locationService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateLocation,
  ): Promise<LocationInfo> {
    return await this.locationService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationService.remove(id);
  }
}
