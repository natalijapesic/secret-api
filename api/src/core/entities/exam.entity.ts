import {
  BaseEntity,
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from 'core/entities';
import { LocationInfo } from 'core/entities/location.entity';
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
  contractId?: number;

  @Property()
  isReady: boolean = true;

  @ManyToMany(() => User)
  users = new Collection<User>(this);

  @OneToMany(() => LocationInfo, (location) => location.exam)
  locations = new Collection<LocationInfo>(this);
}
