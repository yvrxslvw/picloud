import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

const isLocal = process.env.APP_ENV === 'local';
const isDev = process.env.APP_MODE === 'dev';
let envFilePath = isDev ? '.env.development' : '.env.production';
if (isLocal) envFilePath += '.local';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath })],
	controllers: [],
	providers: [],
})
export class AppModule {}
