import { Role } from 'core/entities';

export type JwtPayload = {
  sub: string;
  username: string;
  role: Role;
};
