import { Injectable, NotFoundException } from '@nestjs/common';
import { UserResponse } from './dto/user.response';
import { RegisterUser } from './dto/register-user.request';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Exam, LocationInfo, User } from 'core/entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: EntityRepository<User>,
    @InjectRepository(LocationInfo)
    private locationRepository: EntityRepository<LocationInfo>,
  ) {}

  async findOne(username: string) {
    const user = await this.userRepository.findOne({
      username,
    });

    if (!user) throw new NotFoundException(['User doesnt exist']);

    return user;
  }

  async addOne(newUser: RegisterUser) {
    const user = this.userRepository.create(newUser);
    await this.userRepository.persistAndFlush(user);

    return user;
  }

  async isParlament(address: string): Promise<boolean> {
    const user = this.userRepository.find({ walletAddress: { $eq: address } });

    return !!user;
  }

  async remove(id: string): Promise<string> {
    const user = await this.userRepository.findOne(id);

    this.userRepository.remove(user).flush();

    return id;
  }

  async loadLocations(userId: string) {
    const locations = await this.locationRepository.find(
      {
        users: { id: { $eq: userId } },
      },
      { populate: ['exam'] },
    );

    return locations;
  }

  async getAll() {
    return (await this.userRepository.findAll()).map((user) => {
      const { password, jmbg, ...response } = user;
      return response;
    });
  }
}
