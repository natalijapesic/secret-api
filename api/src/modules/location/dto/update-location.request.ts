import { PartialType } from '@nestjs/mapped-types';
import { CreateLocation } from 'modules/location/dto/create-location.request';

export class UpdateLocation extends PartialType(CreateLocation) {
  userIds: string[];
}
