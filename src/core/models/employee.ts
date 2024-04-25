import { BaseModel } from "./baseModel";
import { Document } from "./document";

export interface Employee extends BaseModel {
  name: string;
  email: string;
  phoneNumber: string;
  position: string;
  departmentId: string;
  cvDocumentId: string;
  jobDescriptionId: string;
  contractDocumentId: string;
  cv?: Document;
  jobDescription?: Document;
  contract?: Document;
}
