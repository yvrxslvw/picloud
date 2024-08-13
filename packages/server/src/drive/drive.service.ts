import { BadRequestException, Injectable } from '@nestjs/common';
import { FilesService } from 'src/files/files.service';
import { UsersService } from 'src/users/users.service';
import { UploadFilesDto } from './dto/upload-files.dto';
import { join } from 'path';
import { Request, Response } from 'express';
import { DeleteFilesDto } from './dto/delete-files.dto';
import { CopyFilesDto } from './dto/copy-files.dto';
import { MoveFilesDto } from './dto/move-files.dto';
import { CreateFolderDto } from './dto/create-folder.dto';

@Injectable()
export class DriveService {
	constructor(private readonly usersService: UsersService, private readonly filesService: FilesService) {}

	async readDir(request: Request, response: Response) {
		const user = await this.usersService.findOneById(request['user'].id);
		const path = request.url.split('/').slice(3).join('/');
		if (!this.filesService.isExist(this.getFullDrivePath(user.id, decodeURI(path))))
			throw new BadRequestException('Данной директории или файла не существует.');
		const result = this.filesService.readDir(this.getFullDrivePath(user.id, decodeURI(path)));
		if (Array.isArray(result)) return response.json(result);
		else return response.redirect(result);
	}

	async uploadFiles(request: Request, uploadFilesDto: UploadFilesDto, files: Express.Multer.File[]) {
		if (files.length === 0) throw new BadRequestException('Отсутствуют файлы для загрузки.');
		const user = await this.usersService.findOneById(request['user'].id);
		let { uploadPath } = uploadFilesDto;
		let totalSize = files.map(file => file.size).reduce((acc, cur) => acc + cur, 0);
		uploadPath = uploadPath.replace('\\', '/');
		totalSize = +(totalSize / Math.pow(1024, 2)).toFixed(2);
		if (user.usedSpace + totalSize > user.totalSpace) throw new BadRequestException('У Вас недостаточно места.');
		if (!this.isValidPath(uploadPath)) throw new BadRequestException('Некорректный путь загрузки файлов.');
		files.forEach(file => {
			const path = join(this.getFullDrivePath(user.id, uploadPath), file.originalname);
			if (this.filesService.isExist(path))
				throw new BadRequestException(`Файл по пути "${join(uploadPath, file.originalname)}" уже существует.`);
		});
		files.forEach(file => {
			this.filesService.createFile(this.getFullDrivePath(user.id, uploadPath), file.originalname, file);
		});
		const usedSpace = +(this.filesService.getSize(this.getFullDrivePath(user.id, '')) / Math.pow(1024, 2)).toFixed(2);
		await user.update({ usedSpace });
		await user.reload();
		return user;
	}

	async createFolder(request: Request, createFolderDto: CreateFolderDto) {
		const { path } = createFolderDto;
		const user = await this.usersService.findOneById(request['user'].id);
		if (this.filesService.isExist(this.getFullDrivePath(user.id, path)))
			throw new BadRequestException(`Директория по пути ${path} уже существует.`);
		this.filesService.createFolder(this.getFullDrivePath(user.id, path));
		const usedSpace = +(this.filesService.getSize(this.getFullDrivePath(user.id, '')) / Math.pow(1024, 2)).toFixed(2);
		await user.update({ usedSpace });
		await user.reload();
		return user;
	}

	async deleteFiles(request: Request, deleteFilesDto: DeleteFilesDto) {
		const { paths } = deleteFilesDto;
		if (paths.length === 0) throw new BadRequestException('Вы не указали пути для удаления.');
		const user = await this.usersService.findOneById(request['user'].id);
		let totalSize = 0;
		paths.forEach(path => {
			path = path.replace('\\', '/');
			if (!this.isValidPath(path)) throw new BadRequestException('Некорректный путь удаления.');
			const fullPath = this.getFullDrivePath(user.id, path);
			if (!this.filesService.isExist(fullPath))
				throw new BadRequestException(`Файла или директории по пути "${path}" не существует.`);
			totalSize += +(this.filesService.getSize(fullPath) / Math.pow(1024, 2)).toFixed(2);
		});
		paths.forEach(path => {
			const fullPath = this.getFullDrivePath(user.id, path);
			this.filesService.remove(fullPath);
		});
		const usedSpace = +(this.filesService.getSize(this.getFullDrivePath(user.id, '')) / Math.pow(1024, 2)).toFixed(2);
		await user.update({ usedSpace });
		await user.reload();
		return user;
	}

	async copyFiles(request: Request, copyFilesDto: CopyFilesDto) {
		let { source, dist } = copyFilesDto;
		const user = await this.usersService.findOneById(request['user'].id);
		source = source.replace('\\', '/');
		dist = dist.replace('\\', '/');
		if (!this.isValidPath(source)) throw new BadRequestException('Некорректный путь копирования.');
		if (!this.isValidPath(dist)) throw new BadRequestException('Некорректный путь назначения.');
		if (!this.filesService.isExist(this.getFullDrivePath(user.id, source)))
			throw new BadRequestException(`Файла или директории по пути "${source}" не существует.`);
		if (this.filesService.isExist(this.getFullDrivePath(user.id, dist)))
			throw new BadRequestException(`Файл или директория по пути "${dist}" уже существует.`);
		let size = +(this.filesService.getSize(this.getFullDrivePath(user.id, source)) / Math.pow(1024, 2)).toFixed(2);
		if (user.usedSpace + size > user.totalSpace) throw new BadRequestException('У Вас недостаточно места.');
		this.filesService.copy(this.getFullDrivePath(user.id, source), this.getFullDrivePath(user.id, dist));
		const usedSpace = +(this.filesService.getSize(this.getFullDrivePath(user.id, '')) / Math.pow(1024, 2)).toFixed(2);
		await user.update({ usedSpace });
		await user.reload();
		return user;
	}

	async moveFiles(request: Request, moveFilesDto: MoveFilesDto) {
		let { source, dist } = moveFilesDto;
		const user = await this.usersService.findOneById(request['user'].id);
		source = source.replace('\\', '/');
		dist = dist.replace('\\', '/');
		if (!this.isValidPath(source)) throw new BadRequestException('Некорректный путь перемещения.');
		if (!this.isValidPath(dist)) throw new BadRequestException('Некорректный путь назначения.');
		if (!this.filesService.isExist(this.getFullDrivePath(user.id, source)))
			throw new BadRequestException(`Файла или директории по пути "${source}" не существует.`);
		if (this.filesService.isExist(this.getFullDrivePath(user.id, dist)))
			throw new BadRequestException(`Файл или директория по пути "${dist}" уже существует.`);
		this.filesService.move(this.getFullDrivePath(user.id, source), this.getFullDrivePath(user.id, dist));
		const usedSpace = +(this.filesService.getSize(this.getFullDrivePath(user.id, '')) / Math.pow(1024, 2)).toFixed(2);
		await user.update({ usedSpace });
		await user.reload();
		return user;
	}

	private getFullDrivePath(userId: number, path: string) {
		return join('drives', userId.toString(), path);
	}

	private isValidPath(path: string): boolean {
		const regex =
			/^(?!.*[<>:"|?*])(?!(.*\\.*){2,})(?!(.*(\.){1,}(?!\w).*))(?!(.*\/\/.*)|(^\/+))(?!.*[\\/]:[^<>:"|?*]*$)(?!.*(?:CON|PRN|AUX|NUL|COM[0-9]|LPT[0-9])(\/.*)?$).*/;
		return regex.test(path);
	}
}
