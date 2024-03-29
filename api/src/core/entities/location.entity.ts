import {
  BaseEntity,
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
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
  time: number;

  @Property({ nullable: true })
  classroom: string;

  @ManyToMany(() => User, (user) => user.locations, { hidden: true })
  users = new Collection<User>(this);

  @ManyToOne(() => Exam, { nullable: true })
  exam: Exam;
}
