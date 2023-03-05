import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { IPFSService } from 'core/services/ipfs.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Exam, User } from 'core/entities';

@Module({
  imports: [MikroOrmModule.forFeature([Exam, User])],
  controllers: [ExamController],
  providers: [ExamService, IPFSService],
})
export class ExamModule {}
