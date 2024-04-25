import { FunctionComponent, useEffect, useState } from "react";
import {
  CustomPageStarter,
  DeleteBadge,
  DownloadBadge,
  EditBadge,
  MyBarLoader,
  PageHeading,
  Pagination,
  SearchBar,
  TableHelmet,
  ViewBadge,
} from "../components";
import {
  Department,
  Employee,
  IPagedQuery,
  PagedResponse,
  PurchaseRequest,
} from "../core";
import { DepartmentServices, EmployeeServices } from "../services";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface EmployeeListProps {}

const EmployeeList: FunctionComponent<EmployeeListProps> = () => {
  const [employeeServices] = useState(new EmployeeServices());
  const [pagedQuery, setPagedQuery] = useState<IPagedQuery<PurchaseRequest>>({
    pageSize: 10,
    page: 1,
    sortBy: "createdAt",
    sortOrder: "DESC",
  });
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const [employeesResponse, setEmployeesResponse] = useState<
    PagedResponse<Employee>
  >({
    total: 0,
    hasNext: false,
    page: 1,
    pageSize: 20,
    items: [],
  });
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | "All">(
    "All"
  );

  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDepartment(event.target.value);
  };

  function onDelete(id: string) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const employeeServices = new EmployeeServices();
          const res = await employeeServices.delete(id);
          console.log(res);
          Swal.fire("Deleted!", "employee has been deleted.", "success");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      const departments = await new DepartmentServices().getAll();
      setDepartments(departments);
      const employeeRes = await employeeServices.getAll();

      // filtered list
      const filteredItems =
        selectedDepartment !== "All"
          ? employeeRes.items.filter(
              (e) => e.departmentId === selectedDepartment
            )
          : employeeRes.items;

      setEmployeesResponse({
        items: filteredItems,
        hasNext: employeeRes.hasNext,
        page: employeeRes.page,
        pageSize: employeeRes.pageSize,
        total: employeeRes.total,
      });

      setIsFetching(false);
    })();
  }, [pagedQuery, selectedDepartment]);

  return (
    <>
      <TableHelmet />
      <CustomPageStarter>
        <div style={{}}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <PageHeading title="Employee List" />
            <a
              onClick={() => navigate("add")}
              className="btn outline-badge-info"
            >
              Create Employee
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
              placeholder="Search Employee"
            />
            <div>
              <select
                id="selectedDepartment"
                onChange={handleDepartmentChange}
                value={selectedDepartment}
                className="form-control"
              >
                <option value="All">All</option>
                {departments?.map((department) => (
                  <option value={department.id} key={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                id="result"
                onChange={(e) =>
                  setPagedQuery((prev) => ({
                    ...prev,
                    pageSize: +e.target.value,
                  }))
                }
                value={pagedQuery.pageSize}
                className="form-control"
              >
                <option value="10">10</option>
                <option value={"20"}>20</option>
                <option value={"30"}>30</option>
              </select>
            </div>
          </div>
        </div>
        {isFetching ? (
          <MyBarLoader />
        ) : (
          <table className="table table-bordered table-hover table-condensed mb-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Job Description</th>
                <th>Contract</th>
                <th>CV</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            {!employeesResponse.items.length ? (
              <span>No Data</span>
            ) : (
              employeesResponse.items
                .filter((e) =>
                  e.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
                )
                ?.map((emp: Employee) => (
                  <tbody>
                    <tr key={emp.id}>
                      <td>{emp.name}</td>
                      <td>{emp.position}</td>
                      <td>
                        {
                          departments?.find((d) => d.id === emp.departmentId)
                            ?.name
                        }
                      </td>
                      <td>{emp.phoneNumber}</td>
                      <td>{emp.email}</td>
                      <td>
                        <ul className="table-controls text-center">
                          <li>
                            <DownloadBadge href={emp.jobDescription?.url!} />
                          </li>
                          <li>
                            <ViewBadge href={emp.jobDescription?.url!} />
                          </li>
                        </ul>
                      </td>
                      <td>
                        <ul className="table-controls text-center">
                          <li>
                            <DownloadBadge href={emp.contract?.url!} />
                          </li>
                          <li>
                            <ViewBadge href={emp.contract?.url!} />
                          </li>
                        </ul>
                      </td>
                      <td>
                        <ul className="table-controls text-center">
                          <li>
                            <DownloadBadge href={emp.cv?.url!} />
                          </li>
                          <li>
                            <ViewBadge href={emp.cv?.url!} />
                          </li>
                        </ul>
                      </td>
                      <td className="text-center">
                        <ul className="table-controls">
                          <li>
                            <EditBadge
                              callback={() =>
                                navigate("edit", {
                                  state: {
                                    item: {
                                      id: emp.id,
                                      name: emp.name,
                                      departmentId: emp.departmentId,
                                      email: emp.email,
                                      phoneNumber: emp.phoneNumber,
                                      position: emp.position,
                                      Contract: emp.contract,
                                      Cv: emp.cv,
                                      JobDescription: emp.jobDescription,
                                    },
                                  },
                                })
                              }
                            />
                          </li>
                          <li>
                            <DeleteBadge callback={() => onDelete(emp.id!)} />
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                ))
            )}
          </table>
        )}
        <Pagination
          setPagedQuery={setPagedQuery}
          pagedQuery={pagedQuery}
          pagedResponse={employeesResponse}
        />
      </CustomPageStarter>
    </>
  );
};

export default EmployeeList;
