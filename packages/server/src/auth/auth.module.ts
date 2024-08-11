import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				global: true,
				secret: config.get<string>('API_SECRET_KEY'),
			}),
		}),
		forwardRef(() => UsersModule),
	],
	exports: [JwtModule],
})
export class AuthModule {}
