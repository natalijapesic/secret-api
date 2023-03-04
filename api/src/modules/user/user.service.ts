import { Injectable, NotFoundException } from '@nestjs/common';
import { UserResponse } from './dto/user.response';
import { RegisterUser } from './dto/register-user.request';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { User } from 'core/entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repository: EntityRepository<User>,
  ) {}

  async findOne(username: string) {
    const user = await this.repository.findOne({
      username,
    });

    if (!user) throw new NotFoundException(['User doesnt exist']);

    return user;
  }

  async addOne(newUser: RegisterUser) {
    const user = this.repository.create(newUser);
    await this.repository.persistAndFlush(user);

    return user;
  }

  async get(id: string): Promise<UserResponse> {
    const user = await this.repository.findOne({
      id,
    });

    if (!user) throw new NotFoundException(['User doesnt exist']);
    const { password, jmbg, ...response } = user;

    return response;
  }

  async remove(id: string): Promise<string> {
    const user = await this.repository.findOne(id);

    this.repository.remove(user).flush();

    return id;
  }

  async getAll() {
    return (await this.repository.findAll()).map((user) => {
      const { password, jmbg, ...response } = user;
      return response;
    });
  }
}
