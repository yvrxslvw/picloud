import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('roles')
export class RolesController {
	constructor(private readonly rolesService: RolesService) {}

	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Post()
	create(@Body() createRoleDto: CreateRoleDto) {
		return this.rolesService.create(createRoleDto);
	}

	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Get()
	findAll() {
		return this.rolesService.findAll();
	}

	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: string) {
		return this.rolesService.findOneById(+id);
	}

	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Patch(':id')
	update(@Param('id', ParseIntPipe) id: string, @Body() updateRoleDto: UpdateRoleDto) {
		return this.rolesService.update(+id, updateRoleDto);
	}

	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: string) {
		return this.rolesService.remove(+id);
	}
}
