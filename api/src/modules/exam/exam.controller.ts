import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Logger,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Exam } from 'core/entities';
import { CreateExamRequest } from 'modules/exam/dto/create-exam.request';
import { UpdateExamRequest } from 'modules/exam/dto/update-exam.request';
import { UpdateUserRelation } from 'modules/exam/dto/update-user-relation.request';
import { UploadQuestionsRequest } from 'modules/exam/dto/upload-questions.request';
import { UploadQuestionsResponse } from 'modules/exam/dto/upload-questions.response';
import { ExamService } from './exam.service';

@ApiTags('Exam')
@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  create(@Body() payload: CreateExamRequest): Promise<Exam> {
    return this.examService.create(payload);
  }

  @Get()
  async findAll(){
    Logger.log('ovde');
    return await this.examService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Exam> {
    return this.examService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() payload: UpdateExamRequest,
  ): Promise<Exam> {
    return this.examService.update(id, payload);
  }

  @Post('/upload-questions')
  upload(
    @Query() request: UploadQuestionsRequest,
  ): Promise<UploadQuestionsResponse> {
    return this.examService.uploadQuestions(request);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examService.remove(id);
  }

  @Patch(':id/relationships/user')
  async updateRelation(
    @Param('id') id: string,
    @Body() payload: UpdateUserRelation,
  ): Promise<Exam> {
    return await this.examService.updateUserRelation(id, payload.userIds);
  }
}
