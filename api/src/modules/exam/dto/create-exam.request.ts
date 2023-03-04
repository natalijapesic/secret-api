import { IsArray } from 'class-validator';
import { LocationInfo } from 'core/types/location';

export class CreateExam {
  name!: string;

  time: number;

  contractId?: number;

  course: string;

  @IsArray()
  locations: LocationInfo[];

  organizationIds: string[];
}
