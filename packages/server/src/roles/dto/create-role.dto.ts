import { IsString, Length } from "class-validator";

export class CreateRoleDto {
	@IsString()
	@Length(3, 10)
	declare tag: string;

	@IsString()
	@Length(3, 24)
	declare description: string;
}
