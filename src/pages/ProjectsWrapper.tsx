import { FunctionComponent } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

interface ProjectsLayoutProps {}

const ProjectsLayout: FunctionComponent<ProjectsLayoutProps> = () => {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
};
export default ProjectsLayout;
