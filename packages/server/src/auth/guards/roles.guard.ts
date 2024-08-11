import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService, private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		try {
			const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
				context.getHandler(),
				context.getClass(),
			]);
			if (!requiredRoles) return true;
			const request = context.switchToHttp().getRequest();
			const token = this.extractTokenFromHeader(request);
			if (!token) throw new UnauthorizedException('Нет доступа.');
			const payload = this.jwtService.verify<{ id: number; roles: string[]; iat: number; exp: number }>(token);
			request['user'] = payload;
			if (!payload.roles.some(role => requiredRoles.includes(role))) throw new ForbiddenException('Нет доступа.');
		} catch (error) {
			throw new UnauthorizedException('Нет доступа.');
		}
		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
