import { Role } from 'core/entities';
import { ResponseUserDto } from 'modules/user/dto/response.dto';

export type JwtPayload = {
  sub: string;
  username: string;
  role: Role;
};
export type AccessToken = { access_token: string };

export type AuthResponse = {
  access_token: string;
  user: ResponseUserDto;
};

