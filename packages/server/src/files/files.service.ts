import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync, rmSync } from 'fs';
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
}
