import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseUserDto } from './dto/response.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from 'core/entities';
import { EntityRepository } from '@mikro-orm/postgresql';

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

  async addOne(newUser: RegisterUserDto): Promise<User> {
    return this.repository.create(newUser);
  }

  async get(id: string): Promise<ResponseUserDto> {
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

  async getAll(): Promise<ResponseUserDto[]> {
    return (await this.repository.findAll()).map((user) => {
      const { password, jmbg, ...response } = user;
      return response;
    });
  }
}
