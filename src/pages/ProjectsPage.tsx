import { FunctionComponent, useEffect, useState } from "react";
import { CustomPageStarter, Loader, PageHeading, Project } from "../components";
import { useNavigate } from "react-router-dom";
import { ApiClient } from "../apiClient";
import { Routes } from "../routes";
import { FiPlus } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { AuthServices, ProjectServices } from "../services";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Project as ProjectType } from "../core";

interface ProjectsPageProps {}

const ProjectsPage: FunctionComponent<ProjectsPageProps> = () => {
  // states
  const apiClient = new ApiClient();
  const [auth] = useState(new AuthServices());
  const [projectServices] = useState(new ProjectServices());
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);

  async function getProjects() {
    setIsFetching(true);
    const projects = await projectServices.getAll();
    setProjects(projects);
    setIsFetching(false);
  }

  useEffect(() => {
    (async () => {
      await getProjects();
    })();
  }, []);

  function onDelete(id: string) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "All data related to this project won't be restorable!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        showLoaderOnConfirm: isDeleting,
        confirmButtonText: "Yes, delete Project!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setIsDeleting(true);
          const projectServices = new ProjectServices();
          const res = await projectServices.delete(id);
          if (res) {
            await getProjects();
            setIsDeleting(false);
          }
          console.log(res);
          Swal.fire("Deleted!", "Project deleted.", "success");
        }
      });
    } catch (error) {
      toast.error(error as string);
    }
  }

  return (
    <div
      className="widget-content widget-content-area"
      style={{ height: "100vh", width: "100%" }}
    >
      <CustomPageStarter>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <PageHeading title="Select Project" />
          <button
            onClick={() => {
              apiClient.clearAuthToken();
              apiClient.clearProjectId();
              navigate("/");
            }}
            className="btn-outline-primary btn-lg"
          >
            <MdLogout />
          </button>
        </div>
        <div className="row mt-5 mb-5">
          {isFetching ? (
            <Loader />
          ) : !projects.length ? (
            <span>You need to create project </span>
          ) : (
            projects.map((project) => (
              <Project
                onDelete={onDelete}
                callback={() => {
                  const apiClient = new ApiClient();
                  apiClient.setProjectId(project.id!);
                  navigate("/dashboard");
                }}
                project={project}
                key={project.id}
              />
            ))
          )}
        </div>
        {auth.getCurrentUser()?.role === "admin" && (
          <div
            onClick={() => navigate("/" + Routes.Add_Projects)}
            className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing"
          >
            <div className="widget widget-card-four custom-project">
              <div
                style={{ display: "flex", gap: "12px", alignItems: "center" }}
              >
                <span>
                  {" "}
                  <FiPlus size={40} />
                </span>
                <h5>Add New Project</h5>
              </div>
            </div>
          </div>
        )}
      </CustomPageStarter>
    </div>
  );
};

export default ProjectsPage;
