import { JwtPayload } from '@/auth';

export * from './typeorm/typeorm.service';
export * from './types/enums';
export const ROLES_KEY = 'roles';

declare module 'express' {
  export interface Request {
    user: JwtPayload;
  }
}
