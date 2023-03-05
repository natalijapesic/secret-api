import { IsArray } from 'class-validator';
import { LocationInfo } from 'core/types/location.dto';

export class CreateExamRequest {
  name!: string;

  time: number;

  course: string;

  @IsArray()
  locations: LocationInfo[];
}
