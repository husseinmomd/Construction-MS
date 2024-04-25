import { ApiClient } from "../apiClient";
import jwtDecode from "jwt-decode";
import { NAMING } from "../constants";
import { CurrentUser } from "../core";
import { Endpoints } from "../config";

export interface LoginOptions {
  email: string;
  password: string;
}

export class AuthServices {
  private readonly path = Endpoints.Auth;
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  public getCurrentUser(): CurrentUser | null {
    const jwt = localStorage.getItem(NAMING.JWT_TOKEN);
    return !jwt ? null : jwtDecode(jwt);
  }

  // public async getUserName () :User {

  // }

  public async login(options: LoginOptions) {
    return this.apiClient
      .post<{
        token: string;
      }>(this.path, options)
      .then((res) => {
        this.apiClient.setAuthToken(res.token);
        return res;
      })
      .catch((error) => console.log("login Error:", error));
  }
}
