import { FunctionComponent, useEffect, useState } from "react";
import {
  CustomPageStarter,
  EditBadge,
  MyBarLoader,
  PageHeading,
  SearchBar,
  TableHelmet,
} from "../components";
import { Role, User } from "../core";
import { useNavigate } from "react-router-dom";
import { RoleServices, UserServices } from "../services";

interface UsersListProps {}

const UsersList: FunctionComponent<UsersListProps> = () => {
  // states
  const [userServices] = useState(new UserServices());
  const [roleServices] = useState(new RoleServices());
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | "All">("All");
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedRole(event.target.value);
  };

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      const res = await userServices.getAll();

      // filtered users
      const filteredUsers =
        selectedRole !== "All"
          ? res.filter((user) => user.roleId === selectedRole)
          : res;
      setUsers(filteredUsers);

      const roles = await roleServices.getAll();
      setRoles(roles);

      setIsFetching(false);
    })();
  }, [selectedRole]);

  // useEffect(() => {
  //   const filteredUsers =
  //     selectedRole !== "All"
  //       ? users.filter((user) => user.roleId === selectedRole)
  //       : users;

  //   setFilteredUsers(filteredUsers);
  // }, [selectedRole, users?.length]);

  return (
    <>
      <TableHelmet />
      <CustomPageStarter>
        <div style={{}}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <PageHeading title="Users List" />

            <a
              onClick={() => navigate("add")}
              className="btn outline-badge-info"
            >
              Create User
            </a>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            {/* search bar */}
            <SearchBar
              query={searchQuery}
              setQuery={setSearchQuery}
              placeholder="Search Users"
            />
            <div>
              <select
                id="selectedCategory"
                onChange={handleCategoryChange}
                value={selectedRole}
                className="form-control"
              >
                <option value="All">All</option>
                {roles?.map((r) => (
                  <option value={r.id} key={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* table */}
        {isFetching ? (
          <MyBarLoader />
        ) : (
          <table className="table table-bordered table-hover table-condensed mb-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Email Address</th>
                <th>User Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            {!users.length ? (
              <span>No Users</span>
            ) : (
              users
                .filter((e) =>
                  e.username
                    .toLowerCase()
                    .includes(searchQuery.toLocaleLowerCase())
                )
                ?.map((user) => (
                  <tbody>
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{roles?.find((r) => r.id === user.roleId)?.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className="badge outline-badge-success">
                          Active
                        </span>
                      </td>
                      <td className="text-center">
                        <ul className="table-controls">
                          <li>
                            <EditBadge
                              callback={() =>
                                navigate("edit", { state: { item: user } })
                              }
                            />
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                ))
            )}
          </table>
        )}
      </CustomPageStarter>
    </>
  );
};

export default UsersList;
