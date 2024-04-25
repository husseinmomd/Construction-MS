import { ApiClient } from "../apiClient";
import { Endpoints } from "../config";
import { PagedResponse, PaymentVoucher, PaymentVoucherOrder } from "../core";

export interface PaymentVoucherPostValues {
  orders: PaymentVoucherOrder[];
  purchaseRequestId: string;
  requestedBy: string;
}
export class PaymentVoucherServices {
  private readonly path = Endpoints.PaymentVouchers;
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  public async getAll(pagedUrl: string = "") {
    return this.apiClient
      .get<PagedResponse<PaymentVoucher>>(this.path + pagedUrl)
      .then((res) => {
        console.log(pagedUrl);
        return res;
      });
  }
  public async create(purchaseRequest: PaymentVoucherPostValues) {
    return this.apiClient.post(this.path, purchaseRequest).then((res) => res);
  }

  public async authorizePaymentVoucher(id: string) {
    return this.apiClient
      .get(this.path + `/${Endpoints.Authorize}/${id}`)
      .then((res) => res);
  }
  public async delete(id: string) {
    return this.apiClient.delete(this.path, id).then((res) => res);
  }
}
