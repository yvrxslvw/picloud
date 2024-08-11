import { IsString } from "class-validator";

export class RoleDto {
	@IsString()
	declare tag: string;
}
