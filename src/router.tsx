import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  AddAsset,
  AddCategory,
  AddDepartment,
  AddEmployee,
  AddPR,
  AddPV,
  AddProject,
  AddUser,
  AssetsList,
  Dashboard,
  EmployeeList,
  Home,
  Login,
  NotFound,
  PaymentVouchers,
  ProjectsLayout,
  ProjectsPage,
  PurchaseRequests,
  Report,
  Reports,
  UnAuthorized,
  UsersList,
} from "./pages";
import { AuthWrapper } from "./components";
import { Routes } from "./routes";
import { AuthServices } from "./services";

const auth = new AuthServices();

export const router = createBrowserRouter([
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <Home /> },
      {
        path: Routes.Reports,
        children: [
          { index: true, element: <Reports /> },
          { path: "finance/add", element: <Report path="finance/add" /> },
          { path: "finance/edit", element: <Report path="finance/edit" /> },
          { path: "work/add", element: <Report path="work/add" /> },
          { path: "work/edit", element: <Report path="work/edit" /> },
        ],
      },
      {
        path: Routes.Employees,
        children: [
          { index: true, element: <EmployeeList /> },
          { path: "add", element: <AddEmployee path="add" /> },
          { path: "edit", element: <AddEmployee path="edit" /> },
          { path: "department/add", element: <AddDepartment /> },
        ],
      },
      {
        path: Routes.Purchase_Requests,
        children: [
          { index: true, element: <PurchaseRequests /> },
          { path: "add", element: <AddPR /> },
        ],
      },
      {
        path: Routes.Payment_Voucher,
        children: [
          {
            index: true,
            element:
              auth.getCurrentUser()?.role !== "engineer" ? (
                <PaymentVouchers />
              ) : (
                <Navigate to={".."} />
              ),
          },
          {
            path: "add",
            element:
              auth.getCurrentUser()?.role !== "engineer" ? (
                <AddPV />
              ) : (
                <Navigate to={".."} />
              ),
          },
        ],
      },

      {
        path: Routes.Assets,
        children: [
          { index: true, element: <AssetsList /> },
          { path: "add", element: <AddAsset path="add" /> },
          { path: "edit", element: <AddAsset path="edit" /> },
          { path: "category/add", element: <AddCategory /> },
        ],
      },
      {
        path: Routes.Users,
        children: [
          {
            index: true,
            element:
              auth.getCurrentUser()?.role === "admin" ? (
                <UsersList />
              ) : (
                <Navigate to={".."} />
              ),
          },
          {
            path: "add",
            element:
              auth.getCurrentUser()?.role === "admin" ? (
                <AddUser path="add" />
              ) : (
                <Navigate to={".."} />
              ),
          },
          {
            path: "edit",
            element:
              auth.getCurrentUser()?.role === "admin" ? (
                <AddUser path="edit" />
              ) : (
                <Navigate to={".."} />
              ),
          },
        ],
      },
    ],
  },
  {
    path: Routes.Projects,
    element: (
      <AuthWrapper>
        <ProjectsLayout />
      </AuthWrapper>
    ),
    children: [
      { index: true, element: <ProjectsPage /> },
      {
        path: "add",
        element:
          auth.getCurrentUser()?.role === "admin" ? (
            <AddProject path="add" />
          ) : (
            <Navigate to={".."} />
          ),
      },
      {
        path: "edit",
        element:
          auth.getCurrentUser()?.role === "admin" ? (
            <AddProject path="edit" />
          ) : (
            <Navigate to={".."} />
          ),
      },
    ],
  },

  //   Auth
  { path: Routes.Login, element: <Login /> },
  //   UnAuthorized
  { path: Routes.UnAuthorized, element: <UnAuthorized /> },
  //   Not Found
  { path: Routes.NotFound, element: <NotFound /> },
]);
