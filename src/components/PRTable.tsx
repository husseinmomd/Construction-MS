import { FunctionComponent } from "react";
import { PagedResponse, PurchaseRequest } from "../core";
import { setInputDate } from "../util";
import { Loader, Preview } from ".";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface PRTableProps {
  purchaseRequestsResponse: PagedResponse<PurchaseRequest>;
  isFetching: boolean;
}

const mySwal = withReactContent(Swal);

export const PRTable: FunctionComponent<PRTableProps> = ({
  purchaseRequestsResponse,
  isFetching,
}) => {
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
  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <div className="th-content">Requested By</div>
          </th>
          <th>
            <div className="th-content">No. Orders</div>
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
        ) : !purchaseRequestsResponse.items.length ? (
          <span>No Data</span>
        ) : (
          purchaseRequestsResponse.items
            .slice(0, 5)
            // .filter((pr) => pr.status === "pending")
            .map((pr) => {
              return (
                <tr onClick={() => onPreview(pr)} key={pr.id}>
                  <td>
                    <div className="td-content customer-name">
                      <img src="assets/img/90x90.jpg" alt="avatar" />
                      {pr.requestedByUser?.username}
                    </div>
                  </td>
                  <td>
                    <div className="td-content product-brand">
                      {pr.orders.length}
                    </div>
                  </td>

                  <td>
                    <div className="td-content pricing">
                      <span>{setInputDate(pr.createdAt?.toString())}</span>
                    </div>
                  </td>
                  <td>
                    <div className="td-content">
                      {pr.status === "pending" ? (
                        <span className="badge outline-badge-danger">
                          Pending
                        </span>
                      ) : (
                        <span className="badge outline-badge-info">
                          Accepted
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
