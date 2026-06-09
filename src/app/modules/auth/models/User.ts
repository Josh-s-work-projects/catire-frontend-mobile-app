import { Module, Permission, Role as UserRole } from "../../../../shared/enums";

type ModulesPermissions = {
  [module in Module]: Permission[];
};

export interface User {
  id: number;
  role_id: number;
  full_name: string;
  email: string;
  dni: number;
  phone_1: string;
  phone_2?: string | null;
  password?: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

export interface Role {
  id: number;
  name: string;
  permissions: Module[];
  permissions_json: ModulesPermissions;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

export interface UserDTO {
  full_name: string;
  role_id: number;
  email: string;
  dni: number;
  phone_1: string;
  phone_2?: string;
  password: string;
}