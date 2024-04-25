import { BaseModel } from "./baseModel";

export interface ReportType extends BaseModel {
  name: "finance" | "work";
}
