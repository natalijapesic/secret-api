import { IsOptional } from 'class-validator';
import { LocationInfo } from 'core/entities/location.entity';

export class CreateExamRequest {
  name!: string;

  time: number;

  course: string;

  @IsOptional()
  locations?: LocationInfo[];
}
