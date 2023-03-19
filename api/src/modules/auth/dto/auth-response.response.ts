import { UserResponse } from 'modules/user/dto/user.response';

export class AuthResponse {
  token: string;
  user: UserResponse;
}
