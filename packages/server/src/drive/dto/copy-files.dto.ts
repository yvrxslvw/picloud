import { IsString } from "class-validator";

export class CopyFilesDto {
	@IsString()
	declare source: string;

	@IsString()
	declare dist: string;
}
