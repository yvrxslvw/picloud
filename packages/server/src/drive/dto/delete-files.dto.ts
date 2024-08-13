import { IsArray } from "class-validator";

export class DeleteFilesDto {
	@IsArray()
	declare paths: string[];
}
