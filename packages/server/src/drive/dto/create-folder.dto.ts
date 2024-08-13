import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFolderDto {
	@IsString()
	@IsNotEmpty()
	declare path: string;
}
