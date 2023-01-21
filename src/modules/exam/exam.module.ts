import { Module } from '@nestjs/common';
import { ExamController } from './exam/exam.controller';
import { ExamService } from './exam/exam.service';

@Module({
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
