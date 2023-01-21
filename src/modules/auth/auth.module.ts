import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from 'modules/user/user.module';
import { ConfigService } from '@nestjs/config';
import { RolesGuard } from 'shared/role/roles.guard';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    // AuthService,
    LocalStrategy,
    JwtStrategy,
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [JwtStrategy],
})
export class AuthModule {}
