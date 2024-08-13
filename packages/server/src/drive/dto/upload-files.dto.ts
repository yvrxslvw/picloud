import { IsString } from "class-validator";

export class UploadFilesDto {
	@IsString()
	declare uploadPath: string;
}
