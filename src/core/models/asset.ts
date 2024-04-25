import { BaseModel } from "./baseModel";

export interface Asset extends BaseModel {
  name: string;
  description: string;
  cost: number;
  stock: number;
  inStock: boolean;
  categoryId: string;
}
