import { IsEmail, IsEnum, Length } from 'class-validator';
import { Role } from 'core/entities';

export class UserResponse {
  @IsEnum(Role)
  public role: Role;

  public id: string;

  @IsEmail()
  public email: string;

  public wallet?: string;

  @Length(4, 10)
  public username: string;
}
