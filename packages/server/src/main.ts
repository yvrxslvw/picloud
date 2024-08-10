import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	const HOST = configService.get('APP_HOST');
	const PORT = configService.get('APP_PORT');

	app.useGlobalPipes(new ValidationPipe());
	app.setGlobalPrefix('/api');
	await app.listen(PORT, HOST);
};
bootstrap();