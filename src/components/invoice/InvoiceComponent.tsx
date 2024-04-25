import { FunctionComponent } from "react";

import { Helmet } from "react-helmet";
import { PaymentVoucher } from "../../core";
import { setInputDate } from "../../util";

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

interface InvoiceComponentProps {
  item: PaymentVoucher;
}

export const InvoiceComponent: FunctionComponent<InvoiceComponentProps> = ({
  item,
}) => {
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
                #Payment Voucher
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
                        Unit Price
                      </th>
                      <th className="text-right" scope="col">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.orders.map((i, idx) => (
                      <tr key={i.id}>
                        <td className="text-left">{idx + 1}</td>
                        <td className="text-left">{i.particular}</td>
                        <td className="text-left">{i.quantity}</td>
                        <td className="text-left">${i.price.toFixed(2)}</td>
                        <td className="text-right">
                          ${(i.price * i.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row py-3 mt-3 d-flex justify-content-between">
            <div className="col">
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: "4px",
                  }}
                >
                  <h6
                    className="text-left"
                    style={{ fontWeight: "bold", fontSize: "14px" }}
                  >
                    Amount in Dollar:
                  </h6>
                  <h6 className="text-left">${item.netAmount}</h6>
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                  <h6
                    className="text-left"
                    style={{
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    Amount in Figures:
                  </h6>
                  <h6 style={{ flex: 1 }} className="text-left">
                    {item.amountInWords}
                  </h6>
                </div>
              </div>
            </div>
            <div className="col">
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: "4px",
                  }}
                >
                  <h6
                    className="text-left"
                    style={{ fontWeight: "bold", fontSize: "14px" }}
                  >
                    Prepared By:
                  </h6>
                  <h6 className="text-left">{item.preparedByUser.username}</h6>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <h6
                    className="text-left"
                    style={{ fontWeight: "bold", fontSize: "14px" }}
                  >
                    Paid By:
                  </h6>
                  <h6 className="text-left">{item.paidByUser.username}</h6>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <h6
                    className="text-left"
                    style={{ fontWeight: "bold", fontSize: "14px" }}
                  >
                    Authorized By:
                  </h6>
                  <h6>
                    {item.authorizedByUser?.username! ?? "................"}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="row pt-5">
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
              className="col"
            >
              <h6 style={{ fontWeight: "bold", fontSize: "14px" }}>
                Admin Signature:
              </h6>
              <h6>
                <h6>........................</h6>
              </h6>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
              className="col"
            >
              <h6 style={{ fontWeight: "bold", fontSize: "14px" }}>
                Finance Signature:
              </h6>
              <h6>........................</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
