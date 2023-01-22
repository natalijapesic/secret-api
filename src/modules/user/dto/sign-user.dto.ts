import { Length } from 'class-validator';

export class SignUserDto {
  @Length(4, 10)
  public username: string;

  @Length(4, 10)
  public password: string;
}
