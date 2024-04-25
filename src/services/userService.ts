import { ApiClient } from "../apiClient";
import { Endpoints } from "../config";
import { User } from "../core";

export interface UserPostValues {
  username: string;
  email: string;
  password: string;
  roleId: string;
}
export interface UserUpdateValues {
  username: string;
  email: string;
  roleId: string;
}
export class UserServices {
  private readonly path = Endpoints.Users;
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  public async getAll() {
    return this.apiClient.get<User[]>(this.path).then((res) => res);
  }
  public async create(user: UserPostValues) {
    return this.apiClient.post(this.path, user).then((res) => res);
  }
  public async update(user: UserUpdateValues, id: string) {
    return this.apiClient.put(this.path, id, user).then((res) => res);
  }
  public async delete(id: string) {
    return this.apiClient.delete(this.path, id).then((res) => res);
  }
}
