import { ApiClient } from "../apiClient";
import { Endpoints } from "../config";
import { PagedResponse, PurchaseRequest, PurchaseRequestOrder } from "../core";

export interface PurchaseRequestPostValues {
  orders: PurchaseRequestOrder[];
}
export class PurchaseRequestServices {
  private readonly path = Endpoints.PurchaseRequest;
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  public async getAll(pagedUrl: string = "", signal?: AbortSignal | undefined) {
    return this.apiClient
      .get<PagedResponse<PurchaseRequest>>(this.path + pagedUrl, { signal })
      .then((res) => res);
  }
  public async create(purchaseRequest: PurchaseRequestPostValues) {
    return this.apiClient.post(this.path, purchaseRequest).then((res) => res);
  }
  public async delete(id: string) {
    return this.apiClient.delete(this.path, id).then((res) => res);
  }
}
