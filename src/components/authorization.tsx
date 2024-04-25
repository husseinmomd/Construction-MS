import { FunctionComponent } from "react";
import { AuthServices } from "../services";
import { Navigate } from "react-router-dom";
import { Routes } from "../routes";

interface AdminWrapperProps {
  children: JSX.Element;
}
export const AdminWrapper: FunctionComponent<AdminWrapperProps> = ({
  children,
}) => {
  const auth = new AuthServices();
  return auth.getCurrentUser()?.role === "admin" ? (
    children
  ) : (
    <Navigate to={Routes.Main} />
  );
};

interface FinanceWrapperProps {
  children: JSX.Element;
}
export const FinanceWrapper: FunctionComponent<FinanceWrapperProps> = ({
  children,
}) => {
  const auth = new AuthServices();
  return auth.getCurrentUser()?.role === "finance" ||
    auth.getCurrentUser()?.role === "admin" ? (
    children
  ) : (
    <Navigate to={Routes.Main} />
  );
};

interface EngineerWrapperProps {
  children: JSX.Element;
}
export const EngineerWrapper: FunctionComponent<EngineerWrapperProps> = ({
  children,
}) => {
  const auth = new AuthServices();
  return auth.getCurrentUser()?.role === "engineer" ? (
    children
  ) : (
    <Navigate to={Routes.Main} />
  );
};
