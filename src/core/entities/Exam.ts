import {
  BaseEntity,
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from 'core/entities';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Exam extends BaseEntity<Exam, 'id'> {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @Property()
  name!: string;

  @Property()
  time: number;

  @Property()
  contractId: number;

  @Property()
  course: string;

  @Property({ type: 'jsonb' })
  locations = new Collection<Location>(this);

  @ManyToMany(() => User)
  students = new Collection<User>(this);

  @ManyToMany(() => User, 'exams', { owner: true })
  organizations = new Collection<User>(this);
}

export interface Location {
  street: string;
  number: string;
  city: string;
  municipality: string;
}
