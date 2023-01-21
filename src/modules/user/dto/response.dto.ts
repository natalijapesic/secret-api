import { Collection } from '@mikro-orm/core';
import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { Exam, Role } from 'core/entities';

export class ResponseUserDto {
  @IsEnum(Role)
  public role: Role;

  @IsString()
  public id: string;

  @IsEmail()
  public email: string;

  @IsString()
  public wallet: string;

  @IsString()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 10)
  public username: string;

  exams: Collection<Exam>;
}
