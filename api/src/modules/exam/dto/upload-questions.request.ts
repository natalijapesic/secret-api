import { Question } from 'core/types/question.dto';

export class UploadQuestionsRequest {
  questions: Question[];

  examId: string;

  walletAddres: string;
}
