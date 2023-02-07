import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { IPFSService } from 'core/services/ipfs.service';

@Module({
  controllers: [ExamController],
  providers: [ExamService, IPFSService]
})
export class ExamModule {}
