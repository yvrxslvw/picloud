import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

const isLocal = process.env.APP_ENV === 'local';
const isDev = process.env.APP_MODE === 'dev';
let envFilePath = isDev ? '.env.development' : '.env.production';
if (isLocal) envFilePath += '.local';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath }),
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
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
