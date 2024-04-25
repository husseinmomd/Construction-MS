import React, { FunctionComponent, useEffect, useState } from "react";
import {
  CustomPageStarter,
  DangerBadge,
  DeleteBadge,
  MyBarLoader,
  PageHeading,
  Pagination,
  Preview,
  SearchBar,
  SuccessBadge,
  TableHelmet,
} from "../components";
import { useNavigate } from "react-router-dom";
import { PagedResponse, PurchaseRequest } from "../core";
import { Routes } from "../routes";
import { pagedUrlBuilder, setInputDate } from "../util";
import { IPagedQuery } from "../core/types/pagedQuery.ts";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { AuthServices } from "../services/authService.ts";
import { PurchaseRequestServices } from "../services/purchaseRequestService.ts";
import toast from "react-hot-toast";
import { BsEye } from "react-icons/bs";
import ReactTimeAgo from "react-time-ago";

interface PurchaseRequestsProps {}

const mySwal = withReactContent(Swal);

// interface LoadedData {
//   purchaseRequests: PagedResponse<PurchaseRequest>;
//   url: string;
// }

const PurchaseRequests: FunctionComponent<PurchaseRequestsProps> = () => {
  // const { purchaseRequests, url } = useLoaderData() as LoadedData;

  // console.log("loaded Data:", purchaseRequests);

  const [auth] = useState(new AuthServices());
  const [purchaseRequestServices] = useState(new PurchaseRequestServices());
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | "All">("All");
  const [pagedQuery, setPagedQuery] = useState<IPagedQuery<PurchaseRequest>>({
    pageSize: 10,
    page: 1,
    sortBy: "createdAt",
    sortOrder: "DESC",
  });

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const [purchaseRequestsResponse, setPurchaseRequestsResponse] = useState<
    PagedResponse<PurchaseRequest>
  >({
    total: 0,
    hasNext: false,
    page: 1,
    pageSize: 20,
    items: [],
  });
  const [isFetching, setIsFetching] = useState(false);

  function onPreview(item: PurchaseRequest) {
    try {
      mySwal
        .fire({
          width: "70%",
          html: <Preview item={item} />,
          cancelButtonText: "Cancel",
          showCancelButton: false,
          confirmButtonText: "OK",
        })
        .then(async () => {
          // do something
        });
    } catch (error) {
      mySwal.fire("error", "error", "error");
    }
  }

  function onDelete(item: PurchaseRequest) {
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
          if (item.status !== "pending") return;
          try {
            const res = await purchaseRequestServices.delete(item.id!);
            const url = pagedUrlBuilder<PurchaseRequest>(
              pagedQuery.sortBy,
              pagedQuery.page,
              pagedQuery.pageSize,
              pagedQuery.sortOrder
            );
            const purchaseRequestsResponse =
              await purchaseRequestServices.getAll(url);
            setPurchaseRequestsResponse(purchaseRequestsResponse);
            console.log(res);
          } catch (error) {
            console.log(error);
          }
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (error) {
      toast.error(error as string);
    }
  }

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      const url = pagedUrlBuilder<PurchaseRequest>(
        pagedQuery.sortBy,
        pagedQuery.page,
        pagedQuery.pageSize,
        pagedQuery.sortOrder
      );

      const res = await purchaseRequestServices.getAll(url);

      // filtered items
      const filteredPurchaseRequestItems =
        selectedStatus !== "All"
          ? res.items.filter((pr) => pr.status === selectedStatus)
          : res.items;

      setPurchaseRequestsResponse({
        items: filteredPurchaseRequestItems,
        total: res.total,
        hasNext: res.hasNext,
        page: res.page,
        pageSize: res.pageSize,
      });
      setIsFetching(false);
    })();
  }, [pagedQuery, selectedStatus]);

  return (
    <>
      <TableHelmet />
      <CustomPageStarter>
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <PageHeading title="Purchase Requests" />
            <a
              onClick={() => navigate("add")}
              className="btn outline-badge-info"
            >
              Create Purchase Request
            </a>
          </div>
          {/* search and filter */}
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
              placeholder="Search Purchase Requests"
            />
            <div>
              <select
                id="selectedReportType"
                onChange={handleStatusChange}
                value={selectedStatus}
                className="form-control"
              >
                <option value="All">All</option>
                <option value={"pending"}>Pending</option>
                <option value={"accepted"}>Accepted</option>
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

          {/* start table */}
          {isFetching ? (
            <MyBarLoader />
          ) : (
            <table className="table table-bordered table-hover table-condensed mb-4">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Number of Orders</th>
                  <th>Requested By</th>
                  <th>Created At</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              {!purchaseRequestsResponse?.items?.length ? (
                <span>No Data</span>
              ) : (
                purchaseRequestsResponse?.items?.map((pr, idx) => (
                  <tbody key={pr.id}>
                    <tr key={pr.id}>
                      <td>{idx + 1}</td>
                      <td>{pr.orders.length}</td>
                      <td>{pr.requestedByUser?.username!}</td>
                      <td>
                        {setInputDate(pr.createdAt?.toString())}{" "}
                        <span
                          style={{ fontSize: "10px", fontWeight: "bold" }}
                          className="pl-3"
                        >
                          <ReactTimeAgo
                            timeStyle={"twitter"}
                            date={pr.createdAt!}
                            locale="en-US"
                          />
                        </span>
                      </td>
                      <td>
                        {pr.status === "pending" ? (
                          <DangerBadge text={pr.status} />
                        ) : (
                          <SuccessBadge text={pr.status} />
                        )}
                      </td>

                      {/* admin actions */}
                      {auth.getCurrentUser()?.role === "admin" ? (
                        <td className="text-center">
                          <ul className="table-controls">
                            {pr.status === "pending" && (
                              <>
                                <li>
                                  <button
                                    onClick={() =>
                                      navigate(
                                        "/dashboard/" +
                                          Routes.Add_Payment_Voucher,
                                        {
                                          state: { item: pr },
                                        }
                                      )
                                    }
                                    className="btn outline-badge-info"
                                  >
                                    Review
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() => onPreview(pr)}
                                    className="badge outline-badge-dark"
                                  >
                                    <BsEye size={22} />
                                  </button>
                                </li>
                              </>
                            )}
                            <li>
                              {pr.status === "pending" && (
                                <DeleteBadge callback={() => onDelete(pr)} />
                              )}
                            </li>
                            {pr.status === "accepted" && (
                              <li>
                                <button
                                  onClick={() => onPreview(pr)}
                                  className="btn outline-badge-info"
                                >
                                  View
                                </button>
                              </li>
                            )}
                          </ul>
                        </td>
                      ) : auth.getCurrentUser()?.role === "engineer" ? (
                        <td className="text-center">
                          <ul className="table-controls">
                            <li>
                              <button
                                onClick={() => onPreview(pr)}
                                className="btn outline-badge-info"
                              >
                                Preview
                              </button>
                            </li>
                          </ul>
                        </td>
                      ) : (
                        <td className="text-center">
                          <ul className="table-controls">
                            {pr.status === "pending" && (
                              <>
                                <li>
                                  <button
                                    onClick={() =>
                                      navigate(
                                        Routes.Payment_Voucher + "/add",
                                        {
                                          state: { item: pr },
                                        }
                                      )
                                    }
                                    className="btn outline-badge-info"
                                  >
                                    Review
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() => onPreview(pr)}
                                    className="badge outline-badge-dark"
                                  >
                                    <BsEye size={22} />
                                  </button>
                                </li>
                              </>
                            )}
                            <li>
                              {pr.status === "pending" && (
                                <DeleteBadge callback={() => {}} />
                              )}
                            </li>
                            {pr.status === "accepted" && (
                              <li>
                                <button
                                  onClick={() => onPreview(pr)}
                                  className="btn outline-badge-info"
                                >
                                  Preview
                                </button>
                              </li>
                            )}
                          </ul>
                        </td>
                      )}
                    </tr>
                  </tbody>
                ))
              )}
            </table>
          )}
        </>
        <Pagination
          setPagedQuery={setPagedQuery}
          pagedQuery={pagedQuery}
          pagedResponse={purchaseRequestsResponse}
        />
      </CustomPageStarter>
    </>
  );
};

export default PurchaseRequests;

// interface LoaderProps {
//   request: {
//     signal: AbortSignal | undefined;
//     url: string;
//   };
// }
// export const loader = async ({ request: { signal, url } }: LoaderProps) => {
//   const purchaseRequestServices = new PurchaseRequestServices();
//   const pagedQuery: IPagedQuery<PurchaseRequest> = {
//     pageSize: 10,
//     page: 1,
//     sortBy: "createdAt",
//     sortOrder: "DESC",
//   };
//   const url = pagedUrlBuilder<PurchaseRequest>(
//     pagedQuery.sortBy,
//     pagedQuery.page,
//     pagedQuery.pageSize,
//     pagedQuery.sortOrder
//   );
//   const res = purchaseRequestServices.getAll(url, signal);
//   if (!res) return;
//   return {
//     purchaseRequests: await res,
//   };
// };

// interface RouteProps {
//   loader: LoaderFunction | undefined;
//   element: JSX.Element;
// }
// export const purchaseRequestsRoute: RouteProps = {
//   loader,
//   element: <PurchaseRequests />,
// };
