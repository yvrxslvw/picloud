import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';
import { Role } from './role.entity';

interface UserRoleCreationAttributes {
	userId: number;
	roleId: number;
}

@Table({ tableName: 'users_roles', createdAt: false, updatedAt: false })
export class UserRole extends Model<UserRole, UserRoleCreationAttributes> {
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
	declare id: number;

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER, allowNull: false })
	declare userId: number;

	@ForeignKey(() => Role)
	@Column({ type: DataType.INTEGER, allowNull: false })
	declare roleId: number;
}
