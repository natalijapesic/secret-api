import { PartialType } from '@nestjs/mapped-types';
import { CreateExamRequest } from './create-exam.request';

export class UpdateExamRequest extends PartialType(CreateExamRequest) {
    isReady: boolean;

    contractId: string;
}
