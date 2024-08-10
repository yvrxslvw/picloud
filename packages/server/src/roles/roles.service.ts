import { Op } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
	constructor(@InjectModel(Role) private readonly roleRepo: typeof Role) {}

	async create(createRoleDto: CreateRoleDto) {
		const { tag, description } = createRoleDto;
		if (await this.isRoleExist(tag)) throw new ForbiddenException(`Роль с данным тегом уже существует.`);
		else if (await this.isRoleExist(description))
			throw new ForbiddenException(`Роль с данным описанием уже существует.`);
		const role = await this.roleRepo.create({ tag, description });
		return role;
	}

	async findAll() {
		const roles = await this.roleRepo.findAll();
		return roles;
	}

	async findOneById(id: number) {
		const role = await this.roleRepo.findByPk(id);
		if (!role) throw new NotFoundException(`Роли с ID ${id} не существует.`);
		return role;
	}

	async findOneByTag(tag: string) {
		const role = await this.roleRepo.findOne({ where: { tag } });
		if (!role) throw new NotFoundException(`Роли с тегом ${tag} не существует.`);
		return role;
	}

	async findOneByDescription(description: string) {
		const role = await this.roleRepo.findOne({ where: { description } });
		if (!role) throw new NotFoundException(`Роли с описанием ${description} не существует.`);
		return role;
	}

	async update(id: number, updateRoleDto: UpdateRoleDto) {
		const role = await this.findOneById(id);
		const { tag, description } = updateRoleDto;
		if (tag && tag !== role.tag && (await this.isRoleExist(tag)))
			throw new ForbiddenException(`Роль с данным тегом уже существует.`);
		else if (description && description !== role.description && (await this.isRoleExist(description)))
			throw new ForbiddenException(`Роль с данным описанием уже существует.`);
		await role.update({ tag, description });
		return role;
	}

	async remove(id: number) {
		const role = await this.findOneById(id);
		await role.destroy();
		return { message: `Роль с ID ${id} успешно удалена.` };
	}

	async isRoleExist(tagOrDescription: string) {
		const role = await this.roleRepo.findOne({
			where: { [Op.or]: { tag: tagOrDescription, description: tagOrDescription } },
		});
		return Boolean(role);
	}
}
