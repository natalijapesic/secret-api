import { IsEmail, IsEnum, Length } from 'class-validator';
import { Role } from 'core/entities';

export class UserResponse {
  @IsEnum(Role)
  public role: Role;

  public id: string;

  @IsEmail()
  public email: string;

  public walletAddress?: string;

  @Length(4, 10)
  public username: string;

  public jmbg: string;
}
