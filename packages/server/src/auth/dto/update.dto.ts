import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateDto {
	@IsOptional()
	@IsString()
	@Length(3, 24)
	declare login: string;

	@IsOptional()
	@IsString()
	@Length(5)
	declare password: string;
}
