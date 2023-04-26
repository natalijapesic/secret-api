import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Exam } from 'core/entities';
import { IPFSInfo } from 'core/types/ipfs.dto';
import { Question } from 'core/types/question.request';
import { CreateExamRequest } from 'modules/exam/dto/create-exam.request';
import { DownloadRequest } from 'modules/exam/dto/download-exam.request';
import { DownloadQuestionsResponse } from 'modules/exam/dto/download-question.response';
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
  async findAll(): Promise<Exam[]> {
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

  @Post('/upload')
  upload(
    @Body() request: UploadQuestionsRequest,
  ): Promise<UploadQuestionsResponse> {
    return this.examService.upload(request);
  }

  @Post('/download')
  download(
    @Body() request: DownloadRequest,
  ): Promise<DownloadQuestionsResponse> {
    return this.examService.download(request.ipfsInfo);
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

  @Get(':id/organizations')
  organizationBy(@Param('id') id: string): Promise<string[]> {
    return this.examService.organizationBy(id);
  }
}
