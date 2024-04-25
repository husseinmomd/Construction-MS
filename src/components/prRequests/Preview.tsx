import { FunctionComponent } from "react";
import { PurchaseRequest } from "../../core";
import { Helmet } from "react-helmet";
import { setInputDate } from "../../util";
import { FiUser } from "react-icons/fi";
import { MdCheck, MdOutlinePending } from "react-icons/md";

interface PreviewProps {
  item: PurchaseRequest;
}

function RenderHelmet() {
  return (
    <Helmet>
      <link
        href="/assets/css/apps/invoice.css"
        rel="stylesheet"
        type="text/css"
      />

      <script src="/assets/js/apps/invoice.js"></script>
    </Helmet>
  );
}

export const Preview: FunctionComponent<PreviewProps> = ({ item }) => {
  return (
    <div id="ct">
      <RenderHelmet />
      <div
        style={{
          fontFamily: "Courier new, monospace",
        }}
        className="invoice-00001"
      >
        <div className="content-section  animated animatedFadeInUp fadeInUp">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
            className="py-5"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <h3
                style={{ color: "grey", fontWeight: "bold" }}
                className="text-left "
              >
                #Purchase Request
              </h3>
              <h6 style={{ textAlign: "left", fontSize: "14px" }}>
                Date: {setInputDate(item.createdAt?.toString())}
              </h6>
              <h6 style={{ textAlign: "left", fontSize: "14px" }}>
                Paid To: ..........................
              </h6>
              <h6 style={{ textAlign: "left", fontSize: "14px" }}>
                Reference Number: #{item.id}
              </h6>
            </div>
            <div
              style={{
                width: "180px",
              }}
            >
              <img
                style={{
                  objectFit: "cover",
                }}
                width={"100%"}
                height={"100%"}
                src="/assets/img/adcon_logo.png"
                alt="logo"
              />
            </div>
          </div>
          <div className="row inv--product-table-section">
            <div className="col-12">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-left" scope="col">
                        NO
                      </th>
                      <th className="text-left" scope="col">
                        Particular
                      </th>
                      <th className="text-left" scope="col">
                        Qty
                      </th>
                      <th className="text-left" scope="col">
                        Qty Type
                      </th>
                      <th className="text-right" scope="col">
                        Remark
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.orders.map((i, idx) => (
                      <tr key={idx}>
                        <td className="text-left">{idx + 1}</td>
                        <td className="text-left">{i.particular}</td>
                        <td className="text-left">{i.quantity}</td>
                        <td className="text-left">{i.quantityType}</td>
                        <td className="text-right">{i.remark}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
                className={
                  item.status === "pending"
                    ? "mt-5 px-3 py-1 badge outline-badge-warning"
                    : "mt-5 px-3 py-1 badge outline-badge-success"
                }
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <FiUser size={22} />
                  <span style={{ fontSize: "16px" }}>
                    {item.requestedByUser?.username}
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  {item.status === "accepted" ? (
                    <MdCheck size={22} />
                  ) : (
                    <MdOutlinePending size={22} />
                  )}
                  <span style={{ fontSize: "16px" }}>{item.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
