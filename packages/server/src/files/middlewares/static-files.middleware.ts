import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class StaticFilesMiddleware implements NestMiddleware {
	constructor(private readonly jwtService: JwtService) {}

	async use(request: Request, response: Response, next: (error?: Error | any) => void) {
		if (!(await this.checkAccess(request))) throw new ForbiddenException('Нет доступа.');
		next();
	}

	private async checkAccess(request: Request): Promise<boolean> {
		try {
			const [type, token] = request.headers.authorization?.split(' ') ?? [];
			if (type !== 'Bearer') return false;
			const payload = await this.jwtService.verifyAsync<User>(token);
			const userId = payload.id;
			const ownerId = parseInt(request.url.slice(1).split('/')[0]);
			if (userId !== ownerId) return false;
			return true;
		} catch (_) {
			return false;
		}
	}
}
