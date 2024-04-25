import { User } from ".";
import { BaseModel } from "./baseModel";
import { Document } from "./document";
export interface Report extends BaseModel {
  document: Document;
  documentId: string;
  remark: string;
  createdBy: string;
  createdByUser: User;
  reportTypeId: string;
}
