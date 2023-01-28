import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ResponseUserDto } from './dto/response.dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get(':id')
  public get(@Param('id') id: string): Promise<ResponseUserDto> {
    return this.service.get(id);
  }

  @Get()
  public getAll(): Promise<ResponseUserDto[]> {
    return this.service.getAll();
  }

  @Delete(':id')
  public delete(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
