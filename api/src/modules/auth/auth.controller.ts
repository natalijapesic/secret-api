import {
  Controller,
  Post,
  UseGuards,
  Get,
  Request,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthResponse } from 'modules/auth';
import { AuthService } from 'modules/auth/auth.service';
import { JwtAuthGuard, LocalAuthGuard } from 'modules/auth/guards';
import { RegisterUserDto } from 'modules/user/dto/register-user.dto';
import { SignUserDto } from 'modules/user/dto/sign-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  signIn(@Body() request: SignUserDto): Promise<AuthResponse> {
    return this.authService.signIn(request);
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
