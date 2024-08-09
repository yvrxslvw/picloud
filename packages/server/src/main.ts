import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

(async () => {
	const HOST = process.env.APP_HOST;
	const PORT = process.env.APP_PORT;
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('/api');
	await app.listen(PORT, HOST);
})();
