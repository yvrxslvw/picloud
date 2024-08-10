import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
	constructor(@InjectModel(User) private readonly userRepo: typeof User) {}

	async create(createUserDto: CreateUserDto) {
		const { login, password } = createUserDto;
		if (await this.isUserExist(login)) throw new ForbiddenException('Пользователь с данным логином уже существует.');
		const hash = await bcrypt.hash(password, 10);
		const user = await this.userRepo.create({ login, password: hash });
		return user;
	}

	async findAll() {
		const users = await this.userRepo.findAll();
		return users;
	}

	async findOneById(id: number) {
		const user = await this.userRepo.findByPk(id);
		if (!user) throw new NotFoundException(`Пользователя с ID ${id} не существует.`);
		return user;
	}

	async findOneByLogin(login: string) {
		const user = await this.userRepo.findOne({ where: { login } });
		if (!user) throw new NotFoundException(`Пользователя с логином ${login} не существует.`);
		return user;
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		const user = await this.findOneById(id);
		const { login, password } = updateUserDto;
		const hash = password && (await bcrypt.hash(password, 10));
		await user.update({ login, password: hash });
		return user;
	}

	async remove(id: number) {
		const user = await this.findOneById(id);
		await user.destroy();
		return { message: `Пользователь с ID ${id} успешно удалён.` };
	}

	async isUserExist(id: number): Promise<boolean>;

	async isUserExist(login: string): Promise<boolean>;

	async isUserExist(param: number | string): Promise<boolean> {
		if (typeof param === 'number') return Boolean(await this.userRepo.findByPk(param));
		else if (typeof param === 'string') return Boolean(await this.userRepo.findOne({ where: { login: param } }));

		throw new Error('Invalid parameter type');
	}
}
