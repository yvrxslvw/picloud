import { IRole } from './IRole';

export interface IUser {
	id: number;
	login: string;
	password: string;
	profileImage: string | null;
	usedSpace: number;
	totalSpace: number;
	createdAt: string;
	roles: IRole[];
}
