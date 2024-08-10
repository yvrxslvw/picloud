import { IsString, Length } from 'class-validator';

export class CreateUserDto {
	@IsString()
	@Length(3, 24)
	declare login: string;

	@IsString()
	@Length(5)
	declare password: string;
}
