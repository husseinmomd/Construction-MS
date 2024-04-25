import { NavLink, useLocation } from "react-router-dom";
import {
  FiArchive,
  FiTrendingUp,
  FiUsers,
  FiSettings,
  FiFileText,
} from "react-icons/fi";
import { AuthServices } from "../../services";
import { FunctionComponent } from "react";
import { Routes } from "../../routes";

interface SidebarProps {}

export const Sidebar: FunctionComponent<SidebarProps> = () => {
  const location = useLocation();
  const currentUser = new AuthServices().getCurrentUser();
  const isActive = (path: string) =>
    location.pathname === `/${Routes.Main}/${path}`;

  return (
    <div className="sidebar-wrapper sidebar-theme">
      <nav id="sidebar">
        <div className="shadow-bottom" />
        <ul className="list-unstyled menu-categories" id="accordionExample">
          <li className="menu">
            <a
              href="#dashboard"
              data-active={
                isActive(Routes.Report_Finance) ||
                isActive(Routes.Report_Work) ||
                isActive(Routes.Reports) ||
                isActive(Routes.Edit_Report)
                  ? "true"
                  : "false"
              }
              data-toggle="collapse"
              aria-expanded={
                isActive(Routes.Report_Finance) ||
                isActive(Routes.Report_Work) ||
                isActive(Routes.Reports) ||
                isActive(Routes.Edit_Report)
                  ? "true"
                  : "false"
              }
              className="dropdown-toggle"
            >
              <div>
                <FiFileText />
                <span>Report</span>
              </div>
              <div>
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
                  className="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </a>
            <ul
              className="collapse submenu list-unstyled"
              id="dashboard"
              data-parent="#accordionExample"
            >
              <li
                className={
                  isActive(Routes.Reports + "/finance/add") ? "active" : ""
                }
              >
                <NavLink to={Routes.Reports + "/finance/add"}>
                  Financial
                </NavLink>
              </li>
              <li
                className={
                  isActive(Routes.Reports + "/work/add") ? "active" : ""
                }
              >
                <NavLink to={Routes.Reports + "/work/add"}>Work </NavLink>
              </li>
              <li className={isActive(Routes.Reports) ? "active" : ""}>
                <NavLink to={Routes.Reports}>Reports </NavLink>
              </li>
            </ul>
          </li>
          <li className="menu">
            <a
              href="#app"
              data-toggle="collapse"
              aria-expanded={
                isActive(Routes.Purchase_Requests) ||
                isActive(Routes.Payment_Voucher) ||
                isActive(Routes.Add_Purchase_Requests) ||
                isActive(Routes.Add_Payment_Voucher)
                  ? "true"
                  : "false"
              }
              data-active={
                isActive(Routes.Purchase_Requests) ||
                isActive(Routes.Payment_Voucher) ||
                isActive(Routes.Add_Purchase_Requests) ||
                isActive(Routes.Add_Payment_Voucher)
                  ? "true"
                  : "false"
              }
              className="dropdown-toggle"
            >
              <div>
                <FiTrendingUp />
                <span>Activities</span>
              </div>
              <div>
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
                  className="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </a>
            <ul
              className="collapse submenu list-unstyled"
              id="app"
              data-parent="#accordionExample"
            >
              <li
                className={
                  isActive(Routes.Purchase_Requests) ||
                  isActive(Routes.Add_Purchase_Requests)
                    ? "active"
                    : ""
                }
              >
                <NavLink to={Routes.Purchase_Requests}>
                  Purchase Requests
                </NavLink>
              </li>
              {currentUser?.role !== "engineer" && (
                <li
                  className={
                    isActive(Routes.Payment_Voucher) ||
                    isActive(Routes.Add_Payment_Voucher)
                      ? "active"
                      : ""
                  }
                >
                  <NavLink to={Routes.Payment_Voucher}>Payment Voucher</NavLink>
                </li>
              )}
            </ul>
          </li>

          <li className="menu">
            <a
              href="#employees"
              data-toggle="collapse"
              aria-expanded={
                isActive(Routes.Employees) ||
                isActive(Routes.Add_Employee) ||
                isActive(Routes.Employees + "/edit") ||
                isActive(Routes.Add_Department)
                  ? "true"
                  : "false"
              }
              className="dropdown-toggle"
              data-active={
                isActive(Routes.Employees) ||
                isActive(Routes.Add_Employee) ||
                isActive(Routes.Employees + "/edit") ||
                isActive(Routes.Add_Department)
                  ? "true"
                  : "false"
              }
            >
              <div>
                <FiUsers />
                <span>Employees</span>
              </div>
              <div>
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
                  className="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </a>
            <ul
              className="collapse submenu list-unstyled"
              id="employees"
              data-parent="#accordionExample"
            >
              <li className={isActive(Routes.Employees) ? "active" : ""}>
                <NavLink to={Routes.Employees}>Employees</NavLink>
              </li>
              <li
                className={
                  isActive(Routes.Employees + "/add") ||
                  isActive(Routes.Employees + "/edit")
                    ? "active"
                    : ""
                }
              >
                <NavLink to={Routes.Add_Employee}>Add Employee</NavLink>
              </li>
              <li
                className={
                  isActive(Routes.Employees + "/department/add") ? "active" : ""
                }
              >
                <NavLink to={Routes.Employees + "/department/add"}>
                  Add Department
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="menu">
            <a
              href="#assets"
              data-active={
                isActive(Routes.Assets) ||
                isActive(Routes.Add_Assets) ||
                isActive(Routes.Edit_Assets) ||
                isActive(Routes.Add_Category)
                  ? "true"
                  : "false"
              }
              data-toggle="collapse"
              aria-expanded={
                isActive(Routes.Assets) ||
                isActive(Routes.Add_Assets) ||
                isActive(Routes.Edit_Assets) ||
                isActive(Routes.Add_Category)
                  ? "true"
                  : "false"
              }
              className="dropdown-toggle"
            >
              <div>
                <FiArchive />
                <span>Asset List</span>
              </div>
              <div>
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
                  className="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </a>
            <ul
              className="collapse submenu list-unstyled"
              id="assets"
              data-parent="#accordionExample"
            >
              <li className={isActive(Routes.Assets) ? "active" : ""}>
                <NavLink to={Routes.Assets}>Asset</NavLink>
              </li>
              <li
                className={
                  isActive(Routes.Add_Assets) || isActive(Routes.Edit_Assets)
                    ? "active"
                    : ""
                }
              >
                <NavLink to={Routes.Assets + "/add"}>Add Asset</NavLink>
              </li>
              <li
                className={
                  isActive(Routes.Assets + "/category/add") ? "active" : ""
                }
              >
                <NavLink to={Routes.Assets + "/category/add"}>
                  Add Category
                </NavLink>
              </li>
            </ul>
          </li>
          {currentUser?.role === "admin" && (
            <li className="menu">
              <a
                href="#manage"
                data-active={
                  isActive(Routes.Users) ||
                  isActive(Routes.Users + "/add") ||
                  isActive(Routes.Users + "/edit")
                    ? "true"
                    : "false"
                }
                data-toggle="collapse"
                aria-expanded={
                  isActive(Routes.Users) ||
                  isActive(Routes.Users + "/add") ||
                  isActive(Routes.Users + "/edit")
                    ? "true"
                    : "false"
                }
                className="dropdown-toggle"
              >
                <div>
                  <FiSettings />

                  <span>Manage</span>
                </div>
                <div>
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
                    className="feather feather-chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </a>
              <ul
                className="collapse submenu list-unstyled"
                id="manage"
                data-parent="#accordionExample"
              >
                <li className={isActive(Routes.Users) ? "active" : ""}>
                  <NavLink to={Routes.Users}> Users </NavLink>
                </li>
                <li
                  className={
                    isActive(Routes.Users + "/add") ||
                    isActive(Routes.Users + "/edit")
                      ? "active"
                      : ""
                  }
                >
                  <NavLink to={Routes.Users + "/add"}> Add User </NavLink>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
