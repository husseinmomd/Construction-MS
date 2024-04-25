import { ApiClient } from "../apiClient";
import { Endpoints } from "../config";
import { PagedResponse, Report, ReportType } from "../core";

export interface ReportPostValues {
  remark: string;
  reportTypeId: string;
  file: File;
}

export class ReportServices {
  private readonly path = Endpoints.Reports;
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  public async getAll() {
    return this.apiClient
      .get<PagedResponse<Report>>(this.path)
      .then((res) => res);
  }

  public async create(report: FormData) {
    return this.apiClient
      .post(this.path, report, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res);
  }

  public async getTypes() {
    return this.apiClient
      .get<ReportType[]>(Endpoints.ReportType)
      .then((res) => res);
  }

  public async delete(id: string) {
    return this.apiClient.delete(this.path, id).then((res) => res);
  }
}
