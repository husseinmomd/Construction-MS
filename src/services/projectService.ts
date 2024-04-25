import { ApiClient } from "../apiClient";
import { Endpoints } from "../config";
import { Project } from "../core";

export class ProjectServices {
  private readonly path = Endpoints.Projects;
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  public async getAll() {
    return this.apiClient.get<Project[]>(this.path).then((res) => res);
  }
  public async create(project: Project) {
    return this.apiClient.post(this.path, project).then((res) => res);
  }
  public async update(project: Project, id: string) {
    return this.apiClient.put(this.path, id, project).then((res) => res);
  }
  public async delete(id: string) {
    return this.apiClient.delete(this.path, id).then((res) => res);
  }
}
