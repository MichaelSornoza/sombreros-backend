import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { ROLES_KEY } from './../decorators/roles.decorator';
import { PayloadToken } from './../models/token.model';
import { Role } from '../../auth/models/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log(request.user);
    const user = request.user as PayloadToken;

    const isAuth = roles.some((role) => role === user.role);

    if (!isAuth) {
      throw new UnauthorizedException('Tu rol no es permitido.');
    }

    return isAuth;
  }
}
