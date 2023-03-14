import { BaseEntity, Entity, PrimaryKey, Property } from '@mikro-orm/core';
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
}
