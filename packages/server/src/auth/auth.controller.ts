import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	login(@Res() response: Response, @Body() loginDto: LoginDto) {
		return this.authService.login(loginDto, response);
	}

	@Post('register')
	register(@Res() response: Response, @Body() registerDto: RegisterDto) {
		return this.authService.register(registerDto, response);
	}
}
