import {
  Controller,
  Post,
  UseGuards,
  Get,
  Request,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'modules/auth/auth.service';
import { AuthResponse } from 'modules/auth/dto/auth-response';
import { JwtAuthGuard, LocalAuthGuard } from 'modules/auth/guards';
import { RegisterUser } from 'modules/user/dto/register-user.request';
import { SignUser } from 'modules/user/dto/sign-user.request';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  signIn(@Body() request: SignUser): Promise<AuthResponse> {
    return this.authService.signIn(request);
  }

  @UseGuards(JwtAuthGuard)
  @Get('info')
  getUserInfo(@Request() req: any) {
    return req.user;
  }

  @Post('signUp')
  signUp(@Body() req: RegisterUser): Promise<AuthResponse> {
    return this.authService.signUp(req);
  }
}
