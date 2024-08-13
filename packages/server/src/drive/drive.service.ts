import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { FilesService } from 'src/files/files.service';
import { UsersService } from 'src/users/users.service';
import { UploadFilesDto } from './dto/upload-files.dto';
import { join } from 'path';
import { Request } from 'express';

@Injectable()
export class DriveService {
	constructor(private readonly usersService: UsersService, private readonly filesService: FilesService) {}

	async uploadFiles(request: Request, uploadFilesDto: UploadFilesDto, files: Express.Multer.File[]) {
		if (files.length === 0) throw new BadRequestException('Отсутствуют файлы для загрузки.');
		const user = await this.usersService.findOneById(request['user'].id);
		let { uploadPath } = uploadFilesDto;
		let totalSize = files.map(file => file.size).reduce((acc, cur) => acc + cur, 0);
		uploadPath = uploadPath.replace('\\', '/');
		totalSize = +(totalSize / Math.pow(1024, 2)).toFixed(2);
		if (user.usedSpace + totalSize > user.totalSpace) throw new ForbiddenException('У Вас недостаточно места.');
		if (!this.isValidPath(uploadPath)) throw new BadRequestException('Некорректный путь загрузки файлов.');
		files.forEach(file => {
			const path = join(this.getFullDrivePath(user.id, uploadPath), file.originalname);
			if (this.filesService.isExist(path))
				throw new BadRequestException(`Файл по пути "${join(uploadPath, file.originalname)}" уже существует.`);
		});
		files.forEach(file => {
			this.filesService.createFile(this.getFullDrivePath(user.id, uploadPath), file.originalname, file);
		});
		await this.usersService.update(user.id, { usedSpace: user.usedSpace + totalSize });
		return { message: `Файл${files.length > 1 ? 'ы' : ''} успешно загружен${files.length > 1 ? 'ы' : ''}.` };
	}

	private getFullDrivePath(userId: number, path: string) {
		return join('drives', userId.toString(), path);
	}

	private isValidPath(path: string): boolean {
		const regex =
			/^(?!.*[<>:"|?*])(?!(.*\\.*){2,})(?!(.*\/\/.*)|(^\/+))(?!.*[\\/]:[^<>:"|?*]*$)(?!.*(?:CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\/.*)?$).*/;
		return regex.test(path);
	}
}
