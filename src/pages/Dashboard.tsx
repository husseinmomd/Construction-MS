import { Layout } from "../layout";
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import { FunctionComponent, useEffect, useState } from "react";
import { ApiClient } from "../apiClient";
import { Routes } from "../routes";

interface DashboardProps {}

const Dashboard: FunctionComponent<DashboardProps> = () => {
  const [apiClient] = useState(new ApiClient());

  const navigate = useNavigate();

  useEffect(() => {
    if (!apiClient.checkProjectId()) {
      navigate(Routes.Projects);
      return;
    }
  }, []);
  return (
    <Layout>
      <ScrollRestoration />
      <Outlet />
    </Layout>
  );
};

export default Dashboard;
