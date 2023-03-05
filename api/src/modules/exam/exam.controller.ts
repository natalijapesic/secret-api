import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateExamRequest } from 'modules/exam/dto/create-exam.request';
import { ExamResponse } from 'modules/exam/dto/exam.response';
import { UpdateExamRequest } from 'modules/exam/dto/update-exam.request';
import { UploadQuestionsRequest } from 'modules/exam/dto/upload-questions.request';
import { UploadQuestionsResponse } from 'modules/exam/dto/upload-questions.response';
import { ExamService } from './exam.service';

@ApiTags('Exam')
@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  create(@Body() payload: CreateExamRequest): Promise<ExamResponse> {
    return this.examService.create(payload);
  }

  @Get()
  find(): Promise<ExamResponse[]> {
    return this.examService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ExamResponse> {
    return this.examService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() payload: UpdateExamRequest,
  ): Promise<ExamResponse> {
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
}
