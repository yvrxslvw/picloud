import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
	@IsString()
	@IsNotEmpty()
	declare login: string;

	@IsString()
	@IsNotEmpty()
	declare password: string;
}
