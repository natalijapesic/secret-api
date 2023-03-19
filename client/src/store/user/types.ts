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
  id: string | null;
  role: Role;
  username: string | null;
}

export interface UserState {
  instance: User;
  locations: LocationInfo[];
  token: string | null;
}
