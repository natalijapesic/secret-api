import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { Base } from 'src/entities/Base';
import { User } from 'src/entities/User';

@Entity()
export class Exam extends Base {
  @Property()
  time: number;

  @Property()
  contractId: number;

  @Property({ type: 'jsonb' })
  locations = new Collection<Location>(this);

  @ManyToMany()
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
