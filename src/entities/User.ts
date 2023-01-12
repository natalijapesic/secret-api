import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  Property,
} from '@mikro-orm/core';
import { Base } from 'src/entities/Base';
import { Exam } from 'src/entities/Exam';

@Entity()
export class User extends Base {
  @Property()
  email: string;

  @Property()
  password: string;

  @Property()
  wallet: string;

  @Enum(() => Role)
  role: Role;

  @ManyToMany(() => Exam, (exam) => exam.organizations)
  exams = new Collection<Exam>(this);
}

export enum Role {
  PARLAMENT = 'Parlament',
  STUDENT = 'Student',
  ORGANIZATION = 'Organization',
}
