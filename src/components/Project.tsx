import { FunctionComponent } from "react";
import { Project as P } from "../core";
import "./custom.css";
import { setInputDate } from "../util";
import { DeleteBadge, EditBadge } from ".";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Routes } from "../routes";

interface ProjectProps {
  project: P;
  callback?: () => void;
  onDelete(id: string): void;
}

export const Project: FunctionComponent<ProjectProps> = ({
  project,
  callback,
  onDelete,
}) => {
  const navigate = useNavigate();
  return (
    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing">
      <div className="widget widget-card-four">
        <div className="widget-content">
          <div className="w-content">
            <div className="w-info">
              <h4 style={{ fontWeight: "bold" }} className="value">
                {project.name}
              </h4>
              <p style={{ fontSize: "13px", color: "#222" }}>
                {project.description}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "end",
                gap: "20px",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", gap: "9px" }}>
                <EditBadge
                  callback={() =>
                    navigate("/" + Routes.Edit_Projects, {
                      state: { item: project },
                    })
                  }
                />
                <DeleteBadge callback={() => onDelete(project.id!)} />
              </div>
              <button onClick={callback} className="badge outline-badge-dark">
                <AiTwotoneFolderOpen size={22} />
              </button>
            </div>
          </div>
          <div className="py-2">
            <span style={{ fontWeight: "bold", paddingRight: "8px" }}>
              Start Date:
            </span>
            <span style={{ fontWeight: "bold" }}>
              {setInputDate(project.startDate.toString())}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
