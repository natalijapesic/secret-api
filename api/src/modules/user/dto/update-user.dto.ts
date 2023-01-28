import { IsNumber } from 'class-validator';

export class UpdateUserDto {
  @IsNumber()
  public examId: number;
}
