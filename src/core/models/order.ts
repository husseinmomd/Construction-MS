import { BaseModel } from "./baseModel";

export interface Order extends BaseModel {
  requestId: number;
  invoiceId: number;
  description: string;
  quantity: number;
  price: number;
  total: number;
}
