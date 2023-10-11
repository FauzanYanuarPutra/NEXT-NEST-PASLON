import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const [req] = context.getArgs();

    console.log('req', req);

    req.user.permission = [
      'admin',
    ]

    const userPermission = ['admin', 'create:paslon'] || [];
    const requiredPermission = this.reflector.get(
      'permission',
      context.getHandler(),
    ) || [];

    const hasAllRequiredPermission = requiredPermission.every(
      (permission) => userPermission.includes(permission),
    )

    if(requiredPermission.length === 0 || hasAllRequiredPermission) {
      console.log('anda memiliki izin')
      return true
    }

    console.log('hasAllRequiredPermission', hasAllRequiredPermission);
    console.log('requiredPermission', requiredPermission);
    console.log('userPermission', userPermission);
    console.log('anda tidak memiliki izin')

    throw new ForbiddenException('Method not implemented.');

  }
}
