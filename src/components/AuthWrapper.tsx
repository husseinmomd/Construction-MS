import { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";
import { ApiClient } from "../apiClient";
import { Routes } from "../routes";

interface AuthWrapperProps {
  children: JSX.Element;
}

const AuthWrapper: FunctionComponent<AuthWrapperProps> = ({ children }) => {
  const auth = new ApiClient();
  return !auth.checkAuth() ? <Navigate to={Routes.Login} replace /> : children;
};

export default AuthWrapper;
