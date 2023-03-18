import {
  BaseEntity,
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Exam, User } from 'core/entities';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class LocationInfo extends BaseEntity<LocationInfo, 'id'> {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @Property()
  street: string;

  @Property()
  number: string;

  @Property()
  city: string;

  @Property({ nullable: true })
  municipality?: string;

  @ManyToMany(() => User, (user) => user.locations)
  users = new Collection<User>(this);

  @ManyToMany(() => Exam, (exam) => exam.locations)
  exams = new Collection<Exam>(this);
}
