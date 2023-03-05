import {
  BaseEntity,
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from 'core/entities';
import { LocationInfo } from 'core/types/location.dto';
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
  contractId: string;

  @Property()
  course: string;

  @Property({ type: 'jsonb' })
  locations: LocationInfo[];

  @Property()
  isReady: boolean = false;

  @ManyToMany(() => User)
  users = new Collection<User>(this);
}
