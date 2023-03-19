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
    const exam = await this.examRepository.findOne(request.examId);
    Logger.log(exam.time);
    if (exam.time !== request.time)
      throw new BadRequestException('Time must be same');

    const location = this.locationRepository.create({
      ...request,
      exam: request.examId,
    });

    await this.locationRepository.persistAndFlush(location);

    return location;
  }

  async update(id: string, request: UpdateLocation) {
    const location = await this.findOne(id);

    const users = request.userIds.map((user) =>
      this.userRepository.getReference(user),
    );

    location.assign({ ...request, users });

    await this.locationRepository.persistAndFlush(location);

    return location;
  }

  async remove(id: string) {
    const location = await this.locationRepository.findOne(id);

    if (!location) throw new NotFoundException('Location does not exist');

    await this.locationRepository.removeAndFlush(location);
  }
}
