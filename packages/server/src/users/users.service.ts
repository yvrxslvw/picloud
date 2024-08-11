import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleDto } from './dto/role.dto';
import { User } from './entities/user.entity';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
	constructor(@InjectModel(User) private readonly userRepo: typeof User, private readonly rolesService: RolesService) {}

	async create(createUserDto: CreateUserDto) {
		const { login, password } = createUserDto;
		if (await this.isUserExist(login)) throw new ForbiddenException('Пользователь с данным логином уже существует.');
		const hash = await bcrypt.hash(password, 10);
		const user = await this.userRepo.create({ login, password: hash });
		return user;
	}

	async findAll() {
		const users = await this.userRepo.findAll({ include: { all: true, nested: true } });
		return users;
	}

	async findOneById(id: number) {
		const user = await this.userRepo.findByPk(id, { include: { all: true, nested: true } });
		if (!user) throw new NotFoundException(`Пользователя с ID ${id} не существует.`);
		return user;
	}

	async findOneByLogin(login: string) {
		const user = await this.userRepo.findOne({ where: { login }, include: { all: true, nested: true } });
		if (!user) throw new NotFoundException(`Пользователя с логином ${login} не существует.`);
		return user;
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		const user = await this.findOneById(id);
		const { login, password, profileImage, usedSpace, totalSpace } = updateUserDto;
		if (login && login !== user.login && (await this.isUserExist(login)))
			throw new ForbiddenException('Пользователь с данным логином уже существует.');
		else if (usedSpace && usedSpace > user.totalSpace)
			throw new BadRequestException('Использованного места не может быть больше суммарного места.');
		else if (totalSpace && totalSpace < user.usedSpace)
			throw new BadRequestException('Суммарного места не может быть меньше использованного места.');
		const hash = password && (await bcrypt.hash(password, 10));
		await user.update({ login, password: hash, profileImage, usedSpace, totalSpace });
		return user;
	}

	async remove(id: number) {
		const user = await this.findOneById(id);
		await user.destroy();
		return { message: `Пользователь с ID ${id} успешно удалён.` };
	}

	async addRole(id: number, roleDto: RoleDto) {
		const { tag } = roleDto;
		const user = await this.findOneById(id);
		const role = await this.rolesService.findOneByTag(tag);
		if (await user.$has('role', role.id)) throw new BadRequestException('У данного пользователя уже есть эта роль.');
		await user.$add('role', role.id);
		await user.reload();
		return user;
	}

	async removeRole(id: number, roleDto: RoleDto) {
		const { tag } = roleDto;
		const user = await this.findOneById(id);
		const role = await this.rolesService.findOneByTag(tag);
		if (!(await user.$has('role', role.id))) throw new BadRequestException('У данного пользователя нет этой роли.');
		await user.$remove('role', role.id);
		await user.reload();
		return user;
	}

	async isUserExist(id: number): Promise<boolean>;

	async isUserExist(login: string): Promise<boolean>;

	async isUserExist(param: number | string): Promise<boolean> {
		if (typeof param === 'number') return Boolean(await this.userRepo.findByPk(param));
		else if (typeof param === 'string') return Boolean(await this.userRepo.findOne({ where: { login: param } }));

		throw new Error('Invalid parameter type');
	}
}
