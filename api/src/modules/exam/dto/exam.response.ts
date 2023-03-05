import { LocationInfo } from 'core/types/location.dto';

export class ExamResponse {
  id: string;

  name!: string;

  time: number;

  course: string;

  locations: LocationInfo[];

  isReady: boolean;

  contractId: string;
}
