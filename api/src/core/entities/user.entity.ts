import {
  BaseEntity,
  Collection,
  Entity,
  Enum,
  ManyToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Exam } from 'core/entities';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User extends BaseEntity<User, 'id'> {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @Property()
  @Unique()
  username: string;

  @Property()
  @Unique()
  email: string;

  @Property()
  password: string;

  @Property()
  walletAddress?: string;

  @Property()
  jmbg: string;

  @Enum(() => Role)
  role: Role;

  @ManyToMany(() => Exam, (exam) => exam.users)
  exams: Collection<Exam> = new Collection<Exam>(this);
}
export enum Role {
  Admin = 'admin',
  Parlament = 'parlament',
  Profesor = 'profesor',
  Student = 'student',
  Organization = 'organization',
}
