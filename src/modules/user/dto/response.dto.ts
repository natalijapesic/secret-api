import { Collection } from '@mikro-orm/core';
import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { Role } from 'core/entities';

export class ResponseUserDto {
  @IsEnum(Role)
  public role: Role;

  public id: string;

  @IsEmail()
  public email: string;

  public wallet?: string;

  public name: string;

  @Length(4, 10)
  public username: string;
}
