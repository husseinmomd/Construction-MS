import { FunctionComponent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthServices, ProjectServices } from "../../services";
import { LiaUserCogSolid } from "react-icons/lia";
import {
  MdOutlineEngineering,
  MdOutlineHome,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { Helmet } from "react-helmet";
import { ApiClient } from "../../apiClient";
import { Project } from "../../core";

interface NavBarProps {}

function RenderHelmet() {
  return (
    <Helmet>
      <link href="/assets/css/structure.css" rel="stylesheet" type="text/css" />
      <script src="/assets/js/app.js"></script>
    </Helmet>
  );
}
export const Navbar: FunctionComponent<NavBarProps> = () => {
  const currentProjectId = new ApiClient().getProjectId();
  const [projects, setProjects] = useState<Project[]>([]);

  const location = useLocation();
  const user = new AuthServices().getCurrentUser();

  useEffect(() => {
    (async () => {
      const projects = await new ProjectServices().getAll();
      setProjects(projects);
    })();
  }, [currentProjectId]);

  return (
    <>
      <RenderHelmet />
      <div className="sub-header-container">
        <header className="header navbar  navbar-expand-sm">
          <a
            onClick={(e) => e.preventDefault()}
            href="javascript:void(0);"
            className="sidebarCollapse"
            data-placement="bottom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-menu"
            >
              <line x1={3} y1={12} x2={21} y2={12} />
              <line x1={3} y1={6} x2={21} y2={6} />
              <line x1={3} y1={18} x2={21} y2={18} />
            </svg>
          </a>
          <ul className="navbar-nav flex-row">
            <li>
              <div className="page-header">
                <nav className="breadcrumb-one" aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/dashboard">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <span>
                        {location.pathname === "/dashboard"
                          ? ""
                          : location.pathname.replace("/dashboard/", "")}
                      </span>
                    </li>
                  </ol>
                </nav>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav flex-row ml-auto mr-4">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
              className="acc-btn"
            >
              {user?.role === "admin" ? (
                <LiaUserCogSolid color="#377f2c" size={22} />
              ) : user?.role === "engineer" ? (
                <MdOutlineEngineering color="#377f2c" size={22} />
              ) : (
                <MdOutlineManageAccounts color="#377f2c" size={22} />
              )}

              <span style={{ fontSize: "17px" }}>{user?.username}</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                paddingLeft: "16px",
              }}
              className="acc-btn"
            >
              <MdOutlineHome color="#333" size={22} />

              <span style={{ fontWeight: "bold", fontSize: "13px" }}>
                {projects.find((p) => p.id === currentProjectId)?.name}
              </span>
            </div>
          </ul>
        </header>
      </div>
    </>
  );
};
