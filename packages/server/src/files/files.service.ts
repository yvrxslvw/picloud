import { Injectable } from '@nestjs/common';
import {
	existsSync,
	mkdirSync,
	writeFileSync,
	rmSync,
	renameSync,
	copyFileSync,
	readdirSync,
	statSync,
	rmdirSync,
} from 'fs';
import { resolve, join } from 'path';

@Injectable()
export class FilesService {
	private readonly STATIC_PATH = resolve(__dirname, '..', 'static');

	constructor() {
		if (!existsSync(this.STATIC_PATH)) mkdirSync(this.STATIC_PATH);
	}

	createFile(path: string, fileName: string, file: any) {
		const filePath = resolve(this.STATIC_PATH, path);
		if (!existsSync(filePath)) mkdirSync(filePath, { recursive: true });
		writeFileSync(join(filePath, fileName), file.buffer);
	}

	createFolder(path: string) {
		const folderPath = resolve(this.STATIC_PATH, path);
		mkdirSync(folderPath, { recursive: true });
	}

	remove(path: string) {
		const fPath = resolve(this.STATIC_PATH, path);
		if (!existsSync(fPath)) throw new Error('Файла или директории не существует.');
		rmSync(fPath, { recursive: true, force: true });
	}

	move(oldPath: string, newPath: string) {
		const oPath = resolve(this.STATIC_PATH, oldPath);
		const nPath = resolve(this.STATIC_PATH, newPath);
		if (!existsSync(oPath)) throw new Error('Файла или директории не существует.');
		if (statSync(oPath).isDirectory()) this.renameSyncRecursive(oPath, nPath);
		else renameSync(oPath, nPath);
	}

	copy(source: string, destination: string) {
		const sPath = resolve(this.STATIC_PATH, source);
		const dPath = resolve(this.STATIC_PATH, destination);
		if (!existsSync(sPath)) throw new Error('Файла или директории не существует.');
		if (!existsSync(dPath.split('/').slice(0, -1).join('/')))
			throw new Error('Директории по пути назначения не существует.');
		if (statSync(sPath).isDirectory()) this.copyFileSyncRecursive(sPath, dPath);
		else copyFileSync(sPath, dPath);
	}

	private renameSyncRecursive(oldPath: string, newPath: string) {
		mkdirSync(join(newPath));
		readdirSync(oldPath).forEach(file => {
			if (statSync(join(oldPath, file)).isDirectory())
				this.renameSyncRecursive(join(oldPath, file), join(newPath, file));
			else renameSync(join(oldPath, file), join(newPath, file));
		});
		rmdirSync(oldPath);
	}

	private copyFileSyncRecursive(source: string, destination: string) {
		mkdirSync(join(destination));
		readdirSync(source).forEach(file => {
			if (statSync(join(source, file)).isDirectory())
				this.copyFileSyncRecursive(join(source, file), join(destination, file));
			else copyFileSync(join(source, file), join(destination, file));
		});
	}
}
