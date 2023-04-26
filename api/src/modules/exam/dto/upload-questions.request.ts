import { Question } from 'core/types/question.request';

export class UploadQuestionsRequest {
  questions: Question[];

  walletAddres: string;

  examId: string;
}
