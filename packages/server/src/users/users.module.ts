import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [SequelizeModule.forFeature([User]), RolesModule, forwardRef(() => AuthModule)],
	exports: [UsersService],
})
export class UsersModule {}
