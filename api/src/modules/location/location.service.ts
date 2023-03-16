import { EntityRepository, LoadStrategy } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LocationInfo } from 'core/entities';
import { CreateLocation } from 'modules/location/dto/create-location.request';
import { UpdateLocation } from 'modules/location/dto/update-location.request';
import { UsersLocation } from 'modules/location/dto/users-location.request';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationInfo)
    private readonly locationRepository: EntityRepository<LocationInfo>,
  ) {}

  async findOne(id: string) {
    const location = await this.locationRepository.findOne(id);

    if (!location) throw new NotFoundException('Location does not exist');

    return location;
  }

  async findUsersLocation(request: UsersLocation) {
    const location = await this.locationRepository.findOne(
      {
        users: { id: { $eq: request.userId } },
        exams: { id: { $eq: request.examId } },
      },
      {
        strategy: LoadStrategy.SELECT_IN,
        populate: ['users', 'exams'],
      },
    );

    return location;
  }

  async findAll() {
    return this.locationRepository.findAll({ populate: ['users', 'exams'] });
  }

  async create(request: CreateLocation) {
    const location = this.locationRepository.create(request);

    await this.locationRepository.persistAndFlush(location);

    return location;
  }

  async update(id: string, request: UpdateLocation) {
    const location = await this.findOne(id);

    location.assign(request);

    await this.locationRepository.persistAndFlush(location);

    return location;
  }

  async remove(id: string) {
    const location = await this.locationRepository.findOne(id);

    if (!location) throw new NotFoundException('Location does not exist');

    await this.locationRepository.removeAndFlush(location);
  }
}
