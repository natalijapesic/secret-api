import { Exam, LocationInfo } from "@/store/api/endpoints";

export interface LoadDataAction {
  data: Exam[];
  isError: boolean;
}

export enum Role {
  Admin = "admin",
  Parlament = "parlament",
  Profesor = "profesor",
  Student = "student",
  Organization = "organization",
}

export interface User {
  id?: string;
  role: Role;
  username?: string;
}

export interface UserState {
  id?: string;
  role: Role;
  username?: string;
  locations: LocationInfo[];
}
