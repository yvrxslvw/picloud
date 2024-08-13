import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
	Req,
	Res,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { DriveService } from './drive.service';
import { UploadFilesDto } from './dto/upload-files.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { DeleteFilesDto } from './dto/delete-files.dto';
import { CopyFilesDto } from './dto/copy-files.dto';
import { MoveFilesDto } from './dto/move-files.dto';

@Controller('drive')
export class DriveController {
	constructor(private readonly driveService: DriveService) {}

	@UseGuards(JwtAuthGuard)
	@Get(['', '*'])
	readDir(@Req() request: Request, @Res() response: Response) {
		return this.driveService.readDir(request, response);
	}

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

	@UseGuards(JwtAuthGuard)
	@Patch()
	copyFiles(@Req() request: Request, @Body() copyFilesDto: CopyFilesDto) {
		return this.driveService.copyFiles(request, copyFilesDto);
	}

	@UseGuards(JwtAuthGuard)
	@Put()
	moveFiles(@Req() request: Request, @Body() moveFilesDto: MoveFilesDto) {
		return this.driveService.moveFiles(request, moveFilesDto);
	}
}
