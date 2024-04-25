import { User } from ".";
import { BaseModel } from "./baseModel";

export interface PurchaseRequestOrder {
  particular: string;
  quantityType?: string;
  remark: string;
  quantity: number;
}
export interface PurchaseRequest extends BaseModel {
  status: "pending" | "rejected" | "accepted";
  requestedByUser?: User;
  requestedBy: string;
  orders: PurchaseRequestOrder[];
}
