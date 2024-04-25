import { ApiClient } from "../apiClient";
import { Endpoints } from "../config";
import { Category } from "../core";

export class CategoryServices {
  private readonly path = Endpoints.Categories;
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  public async getAll() {
    return this.apiClient.get<Category[]>(this.path).then((res) => res);
  }
  public async create(category: Category) {
    return this.apiClient.post(this.path, category).then((res) => res);
  }
}
