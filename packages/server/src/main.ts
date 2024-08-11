import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

const HOST = process.env.APP_HOST;
const PORT = process.env.APP_PORT;
const CLIENT_URL = process.env.CLIENT_URL;

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule, { cors: { origin: CLIENT_URL, credentials: true } });

	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipe());
	app.setGlobalPrefix('/api');
	await app.listen(PORT, HOST);
};
bootstrap();
