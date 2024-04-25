import { ApiClient } from "../apiClient";
import { Endpoints } from "../config";
import { Department } from "../core";

export class DepartmentServices {
  private readonly path = Endpoints.Department;
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  public async getAll() {
    return this.apiClient.get<Department[]>(this.path).then((res) => res);
  }
  public async create(department: Department) {
    return this.apiClient.post(this.path, department).then((res) => res);
  }
}
