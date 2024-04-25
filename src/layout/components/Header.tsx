import { NavLink, useNavigate } from "react-router-dom";
import { ApiClient } from "../../apiClient";
import { FunctionComponent } from "react";
import { BsArrowLeftRight } from "react-icons/bs";
import { MdLogout } from "react-icons/md";

interface HeaderProps {}

export const Header: FunctionComponent<HeaderProps> = () => {
  const apiClient = new ApiClient();
  const navigate = useNavigate();

  function handleLogout() {
    apiClient.clearProjectId();
    apiClient.clearAuthToken();
    navigate("/");
  }

  return (
    <div className="header-container fixed-top">
      <header className="header navbar navbar-expand-sm">
        <ul className="navbar-item theme-brand flex-row  text-center">
          <li className="nav-item theme-text">
            <NavLink className={"nav-link"} to="/dashboard">
              ADCon Co.
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-item align-items-center flex-row  ml-md-auto">
          <li>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
              onClick={() => {
                apiClient.clearProjectId();
                window.location.reload();
              }}
              className="switch-btn"
            >
              <BsArrowLeftRight />
              <span>Switch Project</span>
            </div>
          </li>
          <li>
            <a
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
              onClick={handleLogout}
              className="switch-btn"
            >
              <span>Logout</span>
              <MdLogout />
            </a>
          </li>
        </ul>
      </header>
    </div>
  );
};
