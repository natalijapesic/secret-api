export interface CreateLocation {
  city: string;
  classroom: string;
  number: string;
  street: string;
}

export interface CreateExam {
  name: string;
  time: Date;
  locations: CreateLocation[];
}
