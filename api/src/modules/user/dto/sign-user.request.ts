import { Length } from 'class-validator';

export class SignUser {
  @Length(4, 10)
  public username: string;

  @Length(4, 10)
  public password: string;
}
