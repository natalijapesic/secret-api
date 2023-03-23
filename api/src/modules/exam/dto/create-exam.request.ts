import { LocationInfo } from 'core/entities';

export class CreateExamRequest {
  name!: string;

  time: number;

  locations: LocationInfo[];
}
