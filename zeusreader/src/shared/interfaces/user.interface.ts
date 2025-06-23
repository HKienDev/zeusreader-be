import { UserRole } from '../enums/user-role.enum';

export interface IUser {
  _id: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserResponse {
  _id: string;
  email: string;
  username: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
