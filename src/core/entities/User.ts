import {
  BaseEntity,
  Collection,
  Entity,
  Enum,
  ManyToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Exam } from 'core/entities';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User extends BaseEntity<User, 'id'> {
  id: string = uuidv4();

  @Property()
  name!: string;

  @Property()
  @Unique()
  username: string;

  @Property()
  @Unique()
  email: string;

  @Property()
  password: string;

  @Property()
  wallet: string;

  @Property()
  jmbg: string;

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
