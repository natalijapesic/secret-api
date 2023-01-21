import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { Exam, Role } from 'core/entities';

export class RegisterUserDto {
  @IsEnum(Role)
  public role = Role.STUDENT;

  @IsString()
  @IsNotEmpty()
  @Length(4, 10)
  public username: string;

  @IsString()
  @IsNotEmpty()
  @Length(13)
  public jmbg: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 10)
  public password: string;

  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public wallet: string;

  @IsArray()
  public exams: Exam[];
}
