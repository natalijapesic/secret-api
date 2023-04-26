import { CreateLocation } from 'modules/location/dto/create-location.request';

export class CreateExamRequest {
  name!: string;

  time: number;

  locations: CreateLocation[];
}
