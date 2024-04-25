import { ApiClient } from "../apiClient";
import { Endpoints } from "../config";
import { Role } from "../core";

export interface RolePostValues {
  name: string;
}
export class RoleServices {
  private readonly path = Endpoints.Roles;
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  public async getAll() {
    return this.apiClient.get<Role[]>(this.path).then((res) => res);
  }
  public async create(role: RolePostValues) {
    return this.apiClient.post(this.path, role).then((res) => res);
  }
}
