import { PartialType } from '@nestjs/mapped-types';
import { CreateExam } from './create-exam.request';

export class UpdateExam extends PartialType(CreateExam) {}
