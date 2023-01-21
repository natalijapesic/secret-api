import {
  Controller,
  Post,
  UseGuards,
  Get,
  Request,
  Body,
} from '@nestjs/common';
import { AuthResponse } from 'modules/auth';
import { AuthService } from 'modules/auth/auth.service';
import { JwtAuthGuard, LocalAuthGuard } from 'modules/auth/guards';
import { RegisterUserDto } from 'modules/user/dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  signIn(@Request() req: any): Promise<AuthResponse> {
    return this.authService.signIn(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('info')
  getUserInfo(@Request() req: any) {
    return req.user;
  }

  @Post('signUp')
  signUp(@Body() req: RegisterUserDto): Promise<AuthResponse> {
    return this.authService.signUp(req);
  }
}
