import { FunctionComponent, useEffect, useState } from "react";
import {
  CustomPageStarter,
  DeleteBadge,
  EditBadge,
  MyBarLoader,
  PageHeading,
  Pagination,
  SearchBar,
  TableHelmet,
} from "../components";
import {
  IPagedQuery,
  PagedResponse,
  PurchaseRequest,
  Report,
  ReportType,
} from "../core";
import Swal from "sweetalert2";
import { ReportServices } from "../services";
import toast from "react-hot-toast";

interface ReportsProps {}

const Reports: FunctionComponent<ReportsProps> = () => {
  const [pagedQuery, setPagedQuery] = useState<IPagedQuery<PurchaseRequest>>({
    pageSize: 10,
    page: 1,
    sortBy: "createdAt",
    sortOrder: "DESC",
  });
  // const { reportTypes, getReportTypes, reports, getReports, isFetching } =
  //   useReportStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReportType, setSelectedReportType] = useState<string | "All">(
    "All"
  );

  const [reportServices] = useState(new ReportServices());

  const [filteredReports, setFilteredReports] = useState<Report[]>([]);

  const [reports, setReports] = useState<PagedResponse<Report>>({
    items: [],
    hasNext: false,
    page: 1,
    pageSize: 20,
    total: 0,
  });
  const [reportTypes, setReportTypes] = useState<ReportType[]>([]);

  const [isFetching, setIsFetching] = useState(false);

  const handleReportTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedReportType(event.target.value);
  };

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      const reports = await reportServices.getAll();
      setReports(reports);

      const reportTypes = await reportServices.getTypes();
      setReportTypes(reportTypes);

      setIsFetching(false);
    })();

    console.log(
      "report type",
      reports.items.filter(
        (r) => r.reportTypeId === "0c126c99-5524-4bf6-98ae-ca397ac04e99"
      )
    );
  }, []);

  // useEffect for filtered assets
  useEffect(() => {
    const filteredReports =
      selectedReportType !== "All"
        ? reports?.items.filter(
            (report) => report?.reportTypeId === selectedReportType
          )
        : reports.items;

    setFilteredReports(filteredReports);
  }, [selectedReportType, reports.items.length]);

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
          const res = await reportServices.delete(id);
          console.log(res);
          // await getReports();
          console.log(res);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (error) {
      toast.error(error as string);
    }
  }

  return (
    <>
      <TableHelmet />
      <CustomPageStarter>
        <div style={{}}>
          <PageHeading title="Reports" />
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
              placeholder="Search Assets"
            />
            <div>
              <select
                id="selectedReportType"
                onChange={handleReportTypeChange}
                value={selectedReportType}
                className="form-control"
              >
                <option value="All">All</option>
                {reportTypes?.map((rt: ReportType) => (
                  <option value={rt.id} key={rt.id}>
                    {rt.name}
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
                <th>Report Remark</th>
                <th>Report Type</th>
                <th>Report Doc</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            {!filteredReports?.length ? (
              <span>No Date</span>
            ) : (
              filteredReports
                .filter((r) =>
                  r.remark
                    .toLocaleLowerCase()
                    .includes(searchQuery.toLocaleLowerCase())
                )
                ?.map((report) => (
                  <tbody>
                    <tr key={report.id}>
                      <td>{report.remark}</td>
                      <td>
                        {
                          reportTypes?.find(
                            (c: ReportType) => c.id === report.reportTypeId
                          )?.name
                        }
                      </td>
                      <td>
                        <ul className="table-controls text-center">
                          <li>
                            <a
                              href={report.document?.url}
                              download={true}
                              className="btn outline-badge-primary"
                            >
                              Preview
                            </a>
                          </li>
                          <li>
                            <a
                              href={report.document?.url}
                              download={true}
                              className="btn outline-badge-info"
                            >
                              Download
                            </a>
                          </li>
                        </ul>
                      </td>
                      <td className="text-center">
                        <ul className="table-controls">
                          <li>
                            <EditBadge callback={() => {}} />
                          </li>
                          <li>
                            <DeleteBadge
                              callback={() => onDelete(report.id!)}
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
        <Pagination
          setPagedQuery={setPagedQuery}
          pagedQuery={pagedQuery}
          pagedResponse={reports}
        />
      </CustomPageStarter>
    </>
  );
};

export default Reports;
