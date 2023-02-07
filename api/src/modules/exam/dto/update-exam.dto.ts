import { PartialType } from '@nestjs/mapped-types';
import { CreateExam } from './create-exam.dto';

export class UpdateExam extends PartialType(CreateExam) {}
