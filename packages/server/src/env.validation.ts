import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, Max, Min, validateSync } from 'class-validator';

enum Environment {
	Development = 'development',
	Production = 'production',
}

class EnvironmentVariables {
	@IsEnum(Environment)
	declare NODE_ENV: Environment;

	@IsString()
	declare APP_HOST: string;

	@IsNumber()
	@Min(0)
	@Max(65535)
	declare APP_PORT: number;

	@IsString()
	declare CLIENT_URL: string;

	@IsString()
	declare PSQL_HOST: string;

	@IsNumber()
	@Min(0)
	@Max(65535)
	declare PSQL_PORT: number;

	@IsString()
	declare PSQL_USER: string;

	@IsString()
	declare PSQL_PASSWORD: string;

	@IsString()
	declare PSQL_DATABASE: string;
}

export const validate = (config: Record<string, unknown>) => {
	const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
	const errors = validateSync(validatedConfig, { skipMissingProperties: false });
	if (errors.length > 0) throw new Error(errors.toString());
	return validatedConfig;
};
