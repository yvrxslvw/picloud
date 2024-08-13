import { IsString } from 'class-validator';

export class MoveFilesDto {
	@IsString()
	declare source: string;

	@IsString()
	declare dist: string;
}
