import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { Role } from '@/shared';
import { Roles } from '@/shared/role/roles.decorator';
import { RolesGuard } from '@/shared/role/roles.guard';
import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ResponseUserDto } from './dto/response.dto';
import { UserService } from './user.service';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get(':id')
  public get(@Param('id', ParseIntPipe) id: number): Promise<ResponseUserDto> {
    return this.service.get(id);
  }

  @Get()
  public getAll(): Promise<ResponseUserDto[]> {
    return this.service.getAll();
  }

  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.service.remove(id);
  }

  @Patch(':email')
  public giveProfessorPermission(@Param('email') email: string) {
    return this.service.giveProfessorPermission(email);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.APPLICANT)
  @Patch('subscribe-course/:id')
  public joinCourse(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: Request,
  ) {
    return this.service.joinCourse(request.user.sub, id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.APPLICANT)
  @Patch('unsubscribe-course/:id')
  public unjoinCourse(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: Request,
  ) {
    return this.service.unjoinCourse(request.user.sub, id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.PROFESSOR)
  @Post('upcomming-deadlines')
  async upcommingExams(@Req() request: Request) {
    return await this.service.upcommingDeadlines(request.user.sub);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.PROFESSOR)
  @Post('check-questions')
  async checkQuestions(@Req() request: Request) {
    return await this.service.checkQuestions(request.user.sub);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.APPLICANT)
  @Post('upcomming-exams')
  async apcommingExams(@Req() request: Request) {
    return await this.service.upcommingExams(request.user.sub);
  }
}
