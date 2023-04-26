import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'core/entities';
import { JwtPayload } from 'modules/auth/dto/jwt-payload.request';
import { ROLES_KEY } from 'shared';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const payload: JwtPayload = context.switchToHttp().getRequest().user;

    if (payload) return payload.role == requiredRole;
    else return true;
  }
}
