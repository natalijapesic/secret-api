import { UserResponse } from 'modules/user/dto/user.response';

export class AuthResponse {
  access_token: string;
  user: UserResponse;
}
