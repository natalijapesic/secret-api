import { IsNumber } from 'class-validator';

export class UpdateUser {
  @IsNumber()
  public examId: number;
}
