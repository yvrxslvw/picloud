import { Body, Controller, Patch, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UpdateDto } from './dto/update.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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
	@UseInterceptors(FileInterceptor('profileImage'))
	@Patch('update')
	update(@Req() request: Request, @Body() updateDto: UpdateDto, @UploadedFile() image?: Express.Multer.File) {
		return this.authService.update(request, updateDto, image);
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
