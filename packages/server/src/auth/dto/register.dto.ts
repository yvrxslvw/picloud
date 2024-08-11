import { IsString, Length } from 'class-validator';

export class RegisterDto {
	@IsString()
	@Length(3, 24)
	declare login: string;

	@IsString()
	@Length(5)
	declare password: string;
}
