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

	declare createdAt: Date;
}
