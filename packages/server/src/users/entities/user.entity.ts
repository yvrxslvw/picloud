import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttributes {
	login: string;
	password: string;
}

@Table({ tableName: 'users', updatedAt: false })
export class User extends Model<User, UserCreationAttributes> {
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
	declare id: number;

	@Column({ type: DataType.STRING(24), allowNull: false, unique: true })
	declare login: string;

	@Column({ type: DataType.STRING(64), allowNull: false })
	declare password: string;

	@Column({ type: DataType.STRING(40), unique: true })
	declare profileImage: string;

	@Column({ type: DataType.DOUBLE, allowNull: false, defaultValue: 0.0 })
	declare usedSpace: number;

	@Column({ type: DataType.DOUBLE, allowNull: false, defaultValue: 15.0 })
	declare totalSpace: number;

	declare createdAt: Date;
}
