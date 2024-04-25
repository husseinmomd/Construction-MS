import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from "axios";
import { BASE_URL, NAMING } from "./constants";
import toast from "react-hot-toast";

export class ApiClient {
  private axiosInstance: AxiosInstance;
  private authToken: string | null;
  private projectId: string | null;

  constructor() {
    this.projectId = localStorage.getItem(NAMING.PROJECT_ID);
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
        "Project-Id": this.projectId!,
      },
    });

    this.authToken = localStorage.getItem(NAMING.JWT_TOKEN);

    this.axiosInstance.interceptors.request.use((config) => {
      if (this.authToken) {
        config.headers!.Authorization = `Bearer ${this.authToken}`;
      }
      return config;
    });
  }

  private handleSuccessResponse<T>(response: AxiosResponse<T>) {
    if (response.status === 201) {
      toast.success("The record has been added successfully");
    }
    if (response.status === 204) {
      toast.success("The record has been updated successfully");
    }
    return response.data;
  }

  private handleErrorResponse(error: AxiosError): Promise<never> {
    if (error.response?.status === 401) {
      toast.error(
        error.response.data.message ??
          "Your session has expired, you will be redirected to login page"
      );
      // clear local storage variables & navigate to login
      localStorage.removeItem(NAMING.JWT_TOKEN);
      localStorage.removeItem(NAMING.PROJECT_ID);
      window.location.assign("/");
    } else if (error.response?.status === 403) {
      // console.log("error");
    } else if (error.request?.status === 404) {
      // toast.error("Not Found");
    }
    return Promise.reject(error);
  }

  public checkAuth() {
    return this.authToken !== null;
  }

  public checkProjectId() {
    return this.projectId !== null;
  }

  public getProjectId() {
    return localStorage.getItem(NAMING.PROJECT_ID);
  }

  public setAuthToken(token: string): void {
    this.authToken = token;
    localStorage.setItem(NAMING.JWT_TOKEN, token);
  }

  public setProjectId(projectId: string): void {
    this.projectId = projectId;
    localStorage.setItem(NAMING.PROJECT_ID, projectId);
  }

  public clearAuthToken(): void {
    this.authToken = null;
    localStorage.removeItem(NAMING.JWT_TOKEN);
  }
  public clearProjectId(): void {
    this.projectId = null;
    localStorage.removeItem(NAMING.PROJECT_ID);
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .get<T>(url, config)
      .then(this.handleSuccessResponse)
      .catch(this.handleErrorResponse);
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.axiosInstance
      .post<T>(url, data, config)
      .then(this.handleSuccessResponse)
      .catch(this.handleErrorResponse);
  }
  public async put<T>(
    url: string,
    id: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.axiosInstance
      .put<T>(url + "/" + id, data, config)
      .then(this.handleSuccessResponse)
      .catch(this.handleErrorResponse);
  }

  public async delete<T>(
    url: string,
    id: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.axiosInstance
      .delete<T>(url + "/" + id, config)
      .then(this.handleSuccessResponse)
      .catch(this.handleErrorResponse);
  }
}
