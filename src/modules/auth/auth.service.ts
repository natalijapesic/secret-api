import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse, JwtPayload } from '.';
import { verify, hash } from 'argon2';
import { ResponseUserDto } from 'modules/user/dto/response.dto';
import { User } from 'core/entities';
import { UserService } from 'modules/user/user.service';
import { RegisterUserDto } from 'modules/user/dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtTokenService: JwtService,
  ) {}

  async signUp(dto: RegisterUserDto): Promise<AuthResponse> {
    const hashPassword = await hash(dto.password);
    const user = await this.usersService.addOne({
      ...dto,
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
      access_token: this.jwtTokenService.sign(payload),
    };
  }
  async validateUserCredentials(
    username: string,
    password: string,
  ): Promise<ResponseUserDto> {
    const user: User = await this.usersService.findOne(username);
    if (await verify(user.password, password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, jmbg, ...response } = user;
      return response;
    }

    throw new BadRequestException(['Password does not matches']);
  }

  async signIn(user: User): Promise<AuthResponse> {
    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };

    const response: AuthResponse = {
      user: user,
      access_token: this.jwtTokenService.sign(payload),
    };

    return response;
  }
}
