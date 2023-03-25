import { EntityRepository, LoadStrategy } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Exam, LocationInfo, User } from 'core/entities';
import { CreateLocation } from 'modules/location/dto/create-location.request';
import { UpdateLocation } from 'modules/location/dto/update-location.request';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationInfo)
    private readonly locationRepository: EntityRepository<LocationInfo>,
    @InjectRepository(Exam)
    private readonly examRepository: EntityRepository<Exam>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async findOne(id: string) {
    const location = await this.locationRepository.findOne(id);

    if (!location) throw new NotFoundException('Location does not exist');

    return location;
  }

  async findAll() {
    return this.locationRepository.findAll({ populate: ['exam'] });
  }

  async create(request: CreateLocation) {
    const location = this.locationRepository.create(request);

    await this.locationRepository.persistAndFlush(location);

    return location;
  }

  async update(id: string, request: UpdateLocation) {
    const location = await this.findOne(id);
    location.assign({ ...request });

    const users = request.userIds?.map((user) =>
      this.userRepository.getReference(user),
    );

    if (users) location.assign({ users });

    const exam = this.examRepository.getReference(request.examId);

    if (exam) location.assign({ exam });

    await this.locationRepository.persistAndFlush(location);

    return location;
  }

  async remove(id: string) {
    const location = await this.locationRepository.findOne(id);

    if (!location) throw new NotFoundException('Location does not exist');

    await this.locationRepository.removeAndFlush(location);
  }
}
