import {
  BaseEntity,
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from 'core/entities';
import { LocationInfo } from 'core/types/location';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Exam extends BaseEntity<Exam, 'id'> {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @Property()
  name!: string;

  @Property()
  time: number;

  @Property({ nullable: true })
  contractId: number;

  @Property()
  course: string;

  @Property({ type: 'jsonb' })
  locations: LocationInfo[];

  @ManyToMany(() => User)
  students = new Collection<User>(this);

  @ManyToMany(() => User)
  organizations = new Collection<User>(this);
}
