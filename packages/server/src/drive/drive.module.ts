import { Module } from '@nestjs/common';
import { DriveService } from './drive.service';
import { DriveController } from './drive.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { FilesModule } from 'src/files/files.module';

@Module({
	controllers: [DriveController],
	providers: [DriveService],
	imports: [UsersModule, AuthModule, FilesModule],
})
export class DriveModule {}
