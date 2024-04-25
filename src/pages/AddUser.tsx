import { FunctionComponent, useEffect, useState } from "react";
import { CustomPageStarter, PageHeading, UserForm } from "../components";
import { Role, User } from "../core";
import { useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RoleServices } from "../services";

interface AddUserProps {
  path: string;
}

interface LocationProp {
  state: {
    item: User | null;
  };
  pathname: string;
}
const AddUser: FunctionComponent<AddUserProps> = ({ path }) => {
  const navigate = useNavigate();

  const { state } = useLocation() as LocationProp;

  const [roles, setRoles] = useState<Role[]>([]);

  async function getRoles() {
    try {
      const res = await new RoleServices().getAll();
      setRoles(res);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    (async () => {
      await getRoles();
    })();
  }, []);

  return (
    <CustomPageStarter>
      <div
        className="mb-3"
        style={{ display: "flex", alignItems: "center", gap: "12px" }}
      >
        {path === "edit" && (
          <button
            onClick={() => navigate("..")}
            className="btn outline-badge-primary"
          >
            <BiArrowBack />
          </button>
        )}

        <PageHeading title={path === "edit" ? "Edit User" : "Create User"} />
      </div>

      <div className="w-50">
        <UserForm path={path ?? "add"} user={state?.item} roles={roles} />
      </div>
    </CustomPageStarter>
  );
};

export default AddUser;
