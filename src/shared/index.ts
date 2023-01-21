import { JwtPayload } from "modules/auth";

export const ROLES_KEY = 'roles';

declare module 'express' {
  export interface Request {
    user: JwtPayload;
  }
}
