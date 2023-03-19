import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify, hash } from 'argon2';
import { User } from 'core/entities';
import { UserService } from 'modules/user/user.service';
import { RegisterUser } from 'modules/user/dto/register-user.request';
import { JwtPayload } from 'modules/auth/dto/jwt-payload.request';
import { UserResponse } from 'modules/user/dto/user.response';
import { SignUser } from 'modules/user/dto/sign-user.request';
import { AuthResponse } from 'modules/auth/dto/auth-response.response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtTokenService: JwtService,
  ) {}

  async signUp(request: RegisterUser): Promise<AuthResponse> {
    const hashPassword = await hash(request.password);
    const user = await this.usersService.addOne({
      ...request,
      password: hashPassword,
    });

    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };

    const { password, jmbg, ...response } = user;

    return {
      user: response,
      token: this.jwtTokenService.sign(payload),
    };
  }
  async validateUserCredentials(
    username: string,
    password: string,
  ): Promise<UserResponse> {
    const user: User = await this.usersService.findOne(username);
    if (await verify(user.password, password)) {
      const { password, jmbg, ...response } = user;
      return response;
    }

    throw new BadRequestException(['Password does not matches']);
  }

  async signIn(request: SignUser): Promise<AuthResponse> {
    const user = await this.validateUserCredentials(
      request.username,
      request.password,
    );

    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };

    const response: AuthResponse = {
      user: user,
      token: this.jwtTokenService.sign(payload),
    };

    return response;
  }
}
