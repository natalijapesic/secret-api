import {
  BaseEntity,
  Entity,
  Enum,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User extends BaseEntity<User, 'id'> {
  @PrimaryKey({ type: 'uuid' })
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
  wallet?: string;

  @Property()
  jmbg: string;

  @Enum(() => Role)
  role: Role;
}

export enum Role {
  Parlament = 'parlament',
  Student = 'student',
  Organization = 'organization',
}
