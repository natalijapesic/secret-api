import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { IPFSService } from 'core/services/ipfs.service';
import { SecretJsService } from 'core/services/secretjs.service';
import { MikroORM } from '@mikro-orm/postgresql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Exam } from 'core/entities';

@Module({
  imports: [MikroOrmModule.forFeature([Exam])],
  controllers: [ExamController],
  providers: [ExamService, IPFSService, SecretJsService],
})
export class ExamModule {}
