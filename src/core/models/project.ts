import { BaseModel } from "./baseModel";

export interface Project extends BaseModel {
  name: string;
  description: string;
  startDate: string;
}
