import { BaseModel } from "./baseModel";

export interface User extends BaseModel {
  username: string;
  roleId: string;
  email: string;
}

export interface CurrentUser {
  role: "admin" | "finance" | "engineer";
  email: string;
  userId: string;
  username: string;
}
