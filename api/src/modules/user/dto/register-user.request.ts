import { IsEmail, IsEnum, IsOptional, Length } from 'class-validator';
import { Role } from 'core/entities';

export class RegisterUser {
  @IsEnum(Role)
  public role = Role.Student;

  public name: string;

  @Length(4, 10)
  public username: string;

  @Length(13)
  public jmbg: string;

  @Length(4, 10)
  public password: string;

  @IsEmail()
  public email: string;

  @IsOptional()
  public wallet: string;
}
