import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@IsOptional()
	@IsUUID()
	declare profileImage?: string;
	
	@IsOptional()
	@IsNumber()
	@Min(0)
	declare usedSpace?: number;
	
	@IsOptional()
	@IsNumber()
	@Min(1)
	declare totalSpace?: number;
}
