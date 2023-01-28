import { Collection } from '@mikro-orm/core';
import { IsRFC3339 } from 'class-validator';
import { User } from 'core/entities';

export class CreateExamDto {
  name!: string;

  @IsRFC3339()
  time: number;

  contractId: number;

  course: string;

  locations = new Collection<Location>(this);

  students = new Collection<User>(this);

  organizations = new Collection<User>(this);
}
