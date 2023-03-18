import { Exam } from "@/store/api/endpoints";

export interface LoadDataAction {
  data: Exam[];
  isError: boolean;
}


export enum Role {
  Admin = 'admin',
  Parlament = 'parlament',
  Profesor = 'profesor',
  Student = 'student',
  Organization = 'organization',
}