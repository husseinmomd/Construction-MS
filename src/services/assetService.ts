import { ApiClient } from "../apiClient";
import { Endpoints } from "../config";
import { Asset, Category } from "../core";

export interface AssetPostValues {
  name: string;
  description: string;
  cost: number;
  stock: number;
  inStock: boolean;
  categoryId: string;
}
export class AssetServices {
  private readonly path = Endpoints.Assets;
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  public async getAll(signal?: AbortSignal | undefined) {
    return this.apiClient
      .get<Asset[]>(this.path, { signal })
      .then((res) => res);
  }
  public async create(asset: AssetPostValues) {
    return this.apiClient.post(this.path, asset).then((res) => res);
  }

  public async update(asset: AssetPostValues, id: string) {
    return this.apiClient.put(this.path, id, asset).then((res) => res);
  }

  public async delete(id: string) {
    return this.apiClient.delete(this.path, id).then((res) => res);
  }

  public async getCategories() {
    return this.apiClient
      .get<Category[]>(Endpoints.Categories)
      .then((res) => res);
  }
  public async createCategory(category: Category) {
    return this.apiClient
      .post(Endpoints.Categories, category)
      .then((res) => res);
  }
  public async deleteCategory(id: string) {
    return this.apiClient.delete(Endpoints.Categories, id).then((res) => res);
  }
}
