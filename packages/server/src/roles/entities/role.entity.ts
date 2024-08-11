import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from './user-role.entity';

interface RoleCreationAttributes {
	tag: string;
	description: string;
}

@Table({ tableName: 'roles', createdAt: false, updatedAt: false })
export class Role extends Model<Role, RoleCreationAttributes> {
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
	declare id: number;

	@Column({ type: DataType.STRING(10), unique: true, allowNull: false })
	declare tag: string;

	@Column({ type: DataType.STRING(24), unique: true, allowNull: false })
	declare description: string;

	@BelongsToMany(() => User, () => UserRole)
	declare users: User[];
}
