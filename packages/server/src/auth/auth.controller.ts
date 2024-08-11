import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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

	@UseGuards(JwtAuthGuard)
	@Post('logout')
	logout(@Res() response: Response) {
		return this.authService.logout(response);
	}

	@Post('refresh')
	refresh(@Req() request: Request, @Res() response: Response) {
		return this.authService.refresh(request, response);
	}
}
