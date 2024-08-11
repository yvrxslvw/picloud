import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly usersService: UsersService,
	) {}

	async login(loginDto: LoginDto, response: Response) {
		try {
			const { login, password } = loginDto;
			const user = await this.usersService.findOneByLogin(login);
			if (!(await bcrypt.compare(password, user.password))) throw new ForbiddenException('Неверный логин или пароль.');
			return response.json({ token: await this.generateToken(user, response), user });
		} catch (_) {
			throw new ForbiddenException('Неверный логин или пароль.');
		}
	}

	async register(registerDto: RegisterDto, response: Response) {
		const { login, password } = registerDto;
		const hash = await bcrypt.hash(password, 10);
		const user = await this.usersService.create({ login, password: hash });
		return response.json({ token: await this.generateToken(user, response), user });
	}

	private async generateToken(user: User, response: Response): Promise<string> {
		const { id, roles } = user;
		const accessPayload = { id, roles: roles.map(role => role.tag) };
		const refreshPayload = { id };
		const refreshToken = await this.jwtService.signAsync(refreshPayload, { expiresIn: '30d' });

		response.cookie('refreshToken', refreshToken, {
			maxAge: 1000 * 60 * 60 * 24 * 30,
			path: '/api/auth/refresh',
			secure: this.configService.get('NODE_ENV') === 'production',
			sameSite: this.configService.get('NODE_ENV') === 'production',
		});

		return this.jwtService.sign(accessPayload, { expiresIn: '10m' });
	}
}
