import { ApiClient } from "../apiClient";
import { Endpoints } from "../config";
import { Employee, PagedResponse } from "../core";

export interface EmployeeCreationRequest {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  position: string;
  departmentId: string;
  Cv?: File;
  JobDescription?: File;
  Contract?: File;
}

export class EmployeeServices {
  private readonly path = Endpoints.Employees;
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  public async getAll() {
    return this.apiClient
      .get<PagedResponse<Employee>>(this.path)
      .then((res) => res);
  }
  public async create(employee: EmployeeCreationRequest) {
    return this.apiClient
      .post<Employee>(this.path, employee)
      .then((res) => res);
  }

  public async update(employee: EmployeeCreationRequest, id: string) {
    return this.apiClient
      .put<Employee>(this.path, id, employee)
      .then((res) => res);
  }

  public async uploadDocs(uploadData: FormData) {
    return this.apiClient
      .post(Endpoints.EmployeeUploads, uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res);
  }

  public async delete(id: string) {
    return this.apiClient.delete(this.path, id).then((res) => res);
  }
}
