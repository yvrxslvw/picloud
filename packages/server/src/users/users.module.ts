import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { RolesModule } from 'src/roles/roles.module';

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [SequelizeModule.forFeature([User]), RolesModule],
})
export class UsersModule {}
