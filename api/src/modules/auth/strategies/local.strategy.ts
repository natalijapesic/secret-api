import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'modules/auth/auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({});
  }

  async validate(username: string, password: string): Promise<unknown> {
    const user = await this.authService.validateUserCredentials(
      username,
      password,
    );

    if (!user) throw new UnauthorizedException();
    return user;
  }
}
