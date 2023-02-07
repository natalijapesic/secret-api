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
import { CreateExam } from 'modules/exam/dto/create-exam.dto';
import { UpdateExam } from 'modules/exam/dto/update-exam.dto';
import { ExamService } from './exam.service';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  create(@Body() payload: CreateExam) {
    return this.examService.create(payload);
  }

  @Get()
  find() {
    Logger.debug('HERE');
    return this.examService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateExam) {
    return this.examService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examService.remove(id);
  }
}
