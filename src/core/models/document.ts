import { BaseModel } from "./baseModel";

export interface Document extends BaseModel {
  name: string;
  url: string;
}
