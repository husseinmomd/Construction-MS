import { BaseModel } from "./baseModel";

export interface Invoice extends BaseModel {
  requestId: number;
  totalOrders: number;
}
