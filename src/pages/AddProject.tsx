import { FunctionComponent } from "react";
import { PageHeading, ProjectForm } from "../components";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { Project } from "../core";

interface AddProjectProps {
  path?: string;
}

const AddProject: FunctionComponent<AddProjectProps> = ({}) => {
  interface StateProp {
    state: {
      item: Project | null;
    };
    pathname: string;
  }
  const { state, pathname } = useLocation() as StateProp;
  const navigate = useNavigate();

  return (
    <div
      className="widget-content widget-content-area"
      style={{ height: "100vh" }}
    >
      <div
        style={{
          width: "50%",
          margin: "0 auto",
          paddingTop: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            paddingTop: "100px",
            paddingBottom: "40px",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <button onClick={() => navigate(-1)} className="btn btn-primary">
            <BiArrowBack />
          </button>
          <PageHeading
            title={
              pathname.split("/")[2] === "edit"
                ? "Edit Project"
                : "Create Project"
            }
          />
        </div>
        <ProjectForm path={pathname.split("/")[2]} project={state?.item} />
      </div>
    </div>
  );
};

export default AddProject;
