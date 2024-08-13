import { Body, Controller, Delete, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { DriveService } from './drive.service';
import { UploadFilesDto } from './dto/upload-files.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { DeleteFilesDto } from './dto/delete-files.dto';

@Controller('drive')
export class DriveController {
	constructor(private readonly driveService: DriveService) {}

	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FilesInterceptor('files'))
	@Post()
	uploadFiles(
		@Req() request: Request,
		@Body() uploadFilesDto: UploadFilesDto,
		@UploadedFiles() files: Express.Multer.File[],
	) {
		return this.driveService.uploadFiles(request, uploadFilesDto, files);
	}

	@UseGuards(JwtAuthGuard)
	@Delete()
	deleteFiles(@Req() request: Request, @Body() deleteFilesDto: DeleteFilesDto) {
		return this.driveService.deleteFiles(request, deleteFilesDto);
	}
}
