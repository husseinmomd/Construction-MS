import { FunctionComponent } from "react";
import { PagedResponse, PaymentVoucher } from "../core";
import { setInputDate } from "../util";
import { Loader } from ".";

interface PVTableProps {
  paymentVouchersResponse: PagedResponse<PaymentVoucher>;
  isFetching: boolean;
}

export const PVTable: FunctionComponent<PVTableProps> = ({
  isFetching,
  paymentVouchersResponse,
}) => {
  // function onAuthorize(id: string, item: PaymentVoucher) {
  //   try {
  //     mySwal
  //       .fire({
  //         width: "70%",
  //         html: <InvoiceComponent item={item} />,
  //         cancelButtonText: "Cancel",
  //         showCancelButton: item.authorizedBy === null,
  //         confirmButtonText: item.authorizedBy === null ? "Authorize" : "Print",
  //         confirmButtonColor: "#6CC25E",
  //       })
  //       .then(async (result) => {
  //         if (result.isConfirmed) {
  //           const pvServices = new PaymentVoucherServices();

  //           console.log(res);

  //           mySwal.fire("Authorized", "Voucher has been authorized", "success");
  //         }
  //       });
  //   } catch (error) {
  //     mySwal.fire("error", "error", "error");
  //   }
  // }
  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <div className="th-content">Paid By</div>
          </th>
          <th>
            <div className="th-content">No. Orders</div>
          </th>
          <th>
            <div className="th-content">Net Amount</div>
          </th>
          <th>
            <div className="th-content th-heading">Date</div>
          </th>
          <th>
            <div className="th-content">Status</div>
          </th>
        </tr>
      </thead>
      <tbody>
        {isFetching ? (
          <Loader />
        ) : !paymentVouchersResponse.items.length ? (
          <span>No Data</span>
        ) : (
          paymentVouchersResponse.items.slice(0, 4).map((pv) => {
            return (
              <tr key={pv.id}>
                <td>
                  <div className="td-content customer-name">
                    <img src="assets/img/90x90.jpg" alt="avatar" />
                    {pv.paidByUser.username}
                  </div>
                </td>
                <td>
                  <div className="td-content product-brand">
                    {pv.orders.length}
                  </div>
                </td>
                <td>
                  <div className="td-content">${pv.netAmount}</div>
                </td>
                <td>
                  <div className="td-content pricing">
                    <span>{setInputDate(pv.createdAt?.toString())}</span>
                  </div>
                </td>
                <td>
                  <div className="td-content">
                    {pv.authorizedByUser !== null ? (
                      <span className="badge outline-badge-info">Accepted</span>
                    ) : (
                      <span className="badge outline-badge-danger">
                        Pending
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};
