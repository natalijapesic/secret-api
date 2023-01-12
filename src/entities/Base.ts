import { PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid'

export abstract class Base {
  @PrimaryKey({ type: "uuid" })
  id: string = uuidv4();

  @Property()
  name!: string;
}