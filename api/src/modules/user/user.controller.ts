import { Controller, Delete, Get, Inject, Param } from '@nestjs/common';
import { UserResponse } from './dto/user.response';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { LocationInfo } from 'core/entities';

@ApiTags('User')
@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get(':id')
  async loadLocations(@Param('id') id: string): Promise<LocationInfo[]> {
    return await this.service.loadLocations(id);
  }

  @Get()
  public getAll(): Promise<UserResponse[]> {
    return this.service.getAll();
  }

  @Delete(':id')
  public delete(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
