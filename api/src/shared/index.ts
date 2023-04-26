import { JwtPayload } from "modules/auth/dto/jwt-payload.request";

export const ROLES_KEY = 'roles';

declare module 'express' {
  export interface Request {
    user: JwtPayload;
  }
}
