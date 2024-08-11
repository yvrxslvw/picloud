import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleDto } from './dto/role.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: string) {
		return this.usersService.findOneById(+id);
	}

	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Patch(':id')
	update(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(+id, updateUserDto);
	}

	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: string) {
		return this.usersService.remove(+id);
	}

	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Patch(':id/add-role')
	addRole(@Param('id', ParseIntPipe) id: string, @Body() roleDto: RoleDto) {
		return this.usersService.addRole(+id, roleDto);
	}

	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Patch(':id/remove-role')
	removeRole(@Param('id', ParseIntPipe) id: string, @Body() roleDto: RoleDto) {
		return this.usersService.removeRole(+id, roleDto);
	}
}
