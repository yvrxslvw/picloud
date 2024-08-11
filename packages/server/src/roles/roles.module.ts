import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';
import { UserRole } from './entities/user-role.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	controllers: [RolesController],
	providers: [RolesService],
	imports: [SequelizeModule.forFeature([Role, UserRole]), AuthModule],
	exports: [RolesService],
})
export class RolesModule {}
