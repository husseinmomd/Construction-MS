import React, { FunctionComponent, useEffect, useState } from "react";
import {
  CustomPageStarter,
  DangerBadge,
  DeleteBadge,
  InvoiceComponent,
  MyBarLoader,
  OutlinedButton,
  PageHeading,
  Pagination,
  SearchBar,
  SuccessBadge,
  TableHelmet,
} from "../components";
import { IPagedQuery, PagedResponse, PaymentVoucher } from "../core";
import Swal from "sweetalert2";
import { AuthServices, PaymentVoucherServices } from "../services";
import withReactContent from "sweetalert2-react-content";
import { pagedUrlBuilder, setInputDate } from "../util";
import { BsEye } from "react-icons/bs";
import toast from "react-hot-toast";
import ReactTimeAgo from "react-time-ago";

interface PaymentVouchersProps {}

const mySwal = withReactContent(Swal);

const PaymentVouchers: FunctionComponent<PaymentVouchersProps> = () => {
  const [auth] = useState(new AuthServices());
  const [paymentVoucherServices] = useState(new PaymentVoucherServices());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | "All">("All");
  const [pagedQuery, setPagedQuery] = useState<IPagedQuery<PaymentVoucher>>({
    pageSize: 10,
    page: 1,
    sortBy: "createdAt",
    sortOrder: "DESC",
  });

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const [paymentVouchersResponse, setPaymentVouchersResponse] = useState<
    PagedResponse<PaymentVoucher>
  >({
    total: 0,
    hasNext: false,
    page: 1,
    pageSize: 20,
    items: [],
  });

  const [isFetching, setIsFetching] = useState(false);

  async function getPaymentVouchers() {
    setIsFetching(true);
    const url = pagedUrlBuilder<PaymentVoucher>(
      pagedQuery.sortBy,
      pagedQuery.page,
      pagedQuery.pageSize,
      pagedQuery.sortOrder
    );
    const paymentVouchers = await paymentVoucherServices.getAll(url);
    setPaymentVouchersResponse(paymentVouchers);
    setIsFetching(false);

    console.log(paymentVouchers.items);
  }

  useEffect(() => {
    (async () => {
      await getPaymentVouchers();
    })();
  }, [pagedQuery, selectedStatus]);

  function onDelete(item: PaymentVoucher) {
    if (item.authorizedByUser !== null) return;
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
          const res = await paymentVoucherServices.delete(item.id!);
          await getPaymentVouchers();
          console.log(res);
          Swal.fire("Deleted!", "Voucher has been deleted.", "success");
        }
      });
    } catch (error) {
      toast.error(error as string);
    }
  }

  function onView(item: PaymentVoucher) {
    console.log(item);
    try {
      mySwal
        .fire({
          width: "70%",
          html: <InvoiceComponent item={item} />,
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: "Cancel",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
          }
        });
    } catch (error) {
      mySwal.fire("error", "error", "error");
    }
  }
  function onPrint(item: PaymentVoucher) {
    console.log(item);

    try {
      mySwal
        .fire({
          width: "70%",
          html: <InvoiceComponent item={item} />,
          showCancelButton: false,
          showConfirmButton: false,

          footer: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <OutlinedButton callback={window.print} text="Print" />
            </div>
          ),
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            // print
          }
        });
    } catch (error) {
      mySwal.fire("error", "error", "error");
    }
  }

  function onAuthorize(id: string, item: PaymentVoucher) {
    console.log(item);

    try {
      mySwal
        .fire({
          width: "70%",
          html: <InvoiceComponent item={item} />,
          cancelButtonText: "Cancel",
          showCancelButton: item.authorizedBy === null,
          confirmButtonText: item.authorizedBy === null ? "Authorize" : "Print",
          confirmButtonColor: "#6CC25E",
          loaderHtml: <MyBarLoader />,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const res = await paymentVoucherServices.authorizePaymentVoucher(
              id
            );
            console.log(res);
            await getPaymentVouchers();
            mySwal.fire("Authorized", "Voucher has been authorized", "success");
          }
        });
    } catch (error) {
      mySwal.fire("error", "error", "error");
    }
  }

  return (
    <>
      <TableHelmet />
      <CustomPageStarter>
        <PageHeading title="Payment Vouchers" />
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
            placeholder="Search Payment Vouchers"
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
        {isFetching ? (
          <MyBarLoader />
        ) : (
          <table className="table table-bordered table-hover table-condensed mb-4">
            <thead>
              <tr>
                <th>NO</th>
                <th>Number of Orders</th>
                <th>Net Amount</th>
                <th>Created At</th>
                <th>Prepared By</th>
                <th>Paid By</th>
                <th>Authorized By</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            {!paymentVouchersResponse.items.length ? (
              <span>No Data</span>
            ) : (
              paymentVouchersResponse.items
                ?.filter((r) =>
                  r.orders[0].particular
                    .toLocaleLowerCase()
                    .includes(searchQuery.toLocaleLowerCase())
                )
                .filter((pv) => {
                  if (selectedStatus === "pending") {
                    return pv.authorizedBy === null;
                  } else if (
                    selectedStatus !== "pending" &&
                    selectedStatus !== "All"
                  ) {
                    return pv.authorizedBy !== null;
                  } else {
                    return pv;
                  }
                })

                ?.map((pv, idx) => (
                  <tbody>
                    <tr key={pv.id}>
                      <td>{idx + 1}</td>
                      <td>{pv.orders.length}</td>

                      <td>$ {pv.netAmount}</td>
                      <td>
                        {setInputDate(pv.createdAt?.toString())}{" "}
                        <span
                          style={{ fontSize: "10px", fontWeight: "bold" }}
                          className="pl-2"
                        >
                          <ReactTimeAgo
                            timeStyle={"twitter"}
                            date={new Date(pv.createdAt!)}
                            locale="en-US"
                          />
                        </span>
                      </td>
                      <td>{pv.preparedByUser.username}</td>
                      <td>{pv.paidByUser.username}</td>
                      <td>
                        {pv.authorizedBy === null ? (
                          <DangerBadge text="Pending" />
                        ) : (
                          <SuccessBadge text="Authorized" />
                        )}
                      </td>

                      <td className="text-center">
                        <ul className="table-controls">
                          {!pv.authorizedBy &&
                            auth.getCurrentUser()?.role === "admin" && (
                              <li>
                                <button
                                  onClick={() => onAuthorize(pv.id!, pv)}
                                  className="btn outline-badge-primary"
                                >
                                  Authorize
                                </button>
                              </li>
                            )}
                          {!pv.authorizedBy &&
                            auth.getCurrentUser()?.role !== "engineer" && (
                              <li>
                                <DeleteBadge callback={() => onDelete(pv)} />
                              </li>
                            )}
                          {!pv.authorizedBy &&
                            auth.getCurrentUser()?.role === "finance" && (
                              <li>
                                <button
                                  onClick={() => onView(pv)}
                                  className="badge outline-badge-dark"
                                >
                                  <BsEye size={22} />
                                </button>
                              </li>
                            )}
                          {pv.authorizedBy && (
                            <li>
                              <button
                                style={{ color: "#222" }}
                                onClick={() =>
                                  !pv.authorizedByUser
                                    ? onAuthorize(pv.id!, pv)
                                    : onPrint(pv)
                                }
                                className="btn outline-badge-dark"
                              >
                                Print
                              </button>
                            </li>
                          )}
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
          pagedResponse={paymentVouchersResponse}
        />
      </CustomPageStarter>
    </>
  );
};

export default PaymentVouchers;
