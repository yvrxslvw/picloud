import { IRole } from './IRole';

export interface IUser {
	id: number;
	login: string;
	password: string;
	profileImage: string;
	usedSpace: number;
	totalSpace: number;
	createdAt: string;
	roles: IRole[];
}
