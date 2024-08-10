import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { UsersModule } from './users/users.module';
import { validate } from './env.validation';

const appEnv = process.env.NODE_ENV;
const isDev = appEnv === 'development';
const envFilePath = ['.env', `.env.${appEnv}.local`, `.env.${appEnv}`];

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath, validate }),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.PSQL_HOST,
			port: Number(process.env.PSQL_PORT),
			username: process.env.PSQL_USER,
			password: process.env.PSQL_PASSWORD,
			database: process.env.PSQL_DATABASE,
			logging: isDev ? sql => console.log(sql) : false,
			autoLoadModels: true,
		}),
		ServeStaticModule.forRoot({
			rootPath: resolve(__dirname, 'static'),
			exclude: ['/api/(.*)'],
			serveRoot: '/api',
		}),
		UsersModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
