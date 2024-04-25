import { User } from ".";
import { BaseModel } from "./baseModel";

export interface PaymentVoucherOrder extends BaseModel {
  particular: string;
  price: number;
  remark?: string;
  quantity: number;
}

export interface PaymentVoucher extends BaseModel {
  authorizedBy: string;
  amountInFigures: number;
  netAmount: number;
  requestedByUser: User;
  authorizedByUser: User;
  preparedByUser: User;
  paidByUser: User;
  amountInWords: string;
  preparedBy: string;
  paidBy: string;
  orders: PaymentVoucherOrder[];
}
