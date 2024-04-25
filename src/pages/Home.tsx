import { FunctionComponent, useEffect, useState } from "react";
import {
  CustomPageStarter,
  PRTable,
  PVTable,
  PageHeading,
  StatisticEmp,
  StatisticsAssets,
} from "../components";
import { Helmet } from "react-helmet";
import { Routes } from "../routes";
import { useNavigate } from "react-router-dom";
import {
  AssetServices,
  AuthServices,
  EmployeeServices,
  PaymentVoucherServices,
  ProjectServices,
  PurchaseRequestServices,
} from "../services";
import {
  Asset,
  PagedResponse,
  PaymentVoucher,
  Project,
  PurchaseRequest,
  Employee,
} from "../core";
import { NAMING } from "../constants";

interface HomeProps {}

function RenderHelmet() {
  return (
    <Helmet>
      <link
        href="/plugins/apex/apexcharts.css"
        rel="stylesheet"
        type="text/css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="/assets/css/widgets/modules-widgets.css"
      />
    </Helmet>
  );
}

const Home: FunctionComponent<HomeProps> = () => {
  const navigate = useNavigate();
  const [auth] = useState(new AuthServices());
  const [purchaseRequestsResponse, setPurchaseRequestsResponse] = useState<
    PagedResponse<PurchaseRequest>
  >({
    total: 0,
    hasNext: false,
    page: 1,
    pageSize: 20,
    items: [],
  });
  const [paymentVouchersResponse, setPaymentVouchersResponse] = useState<
    PagedResponse<PaymentVoucher>
  >({
    total: 0,
    hasNext: false,
    page: 1,
    pageSize: 20,
    items: [],
  });

  const [employeesResponse, setEmployeesResponse] = useState<
    PagedResponse<Employee>
  >({
    total: 0,
    hasNext: false,
    page: 1,
    pageSize: 20,
    items: [],
  });

  const [assets, setAssets] = useState<Asset[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState("");

  useEffect(() => {
    (async () => {
      const currentProjectId = localStorage.getItem(NAMING.JWT_TOKEN) ?? "";

      setCurrentProjectId(currentProjectId);
      // get purchaseRequests
      const purchaseRequests = await new PurchaseRequestServices().getAll();
      setPurchaseRequestsResponse(purchaseRequests);
      // get paymentVouchers
      const paymentVouchers = await new PaymentVoucherServices().getAll();
      setPaymentVouchersResponse(paymentVouchers);
      // get Projects
      const projects = await new ProjectServices().getAll();
      setProjects(projects);
      const employees = await new EmployeeServices().getAll();
      setEmployeesResponse(employees);
      // get Assets
      const assets = await new AssetServices().getAll();
      setAssets(assets);
    })();
  }, []);

  // Function to calculate total expenses from an array of PaymentVouchers
  function calculateTotalExpenses(paymentVouchers: PaymentVoucher[]): number {
    let totalExpenses = 0;

    paymentVouchers.forEach((voucher) => {
      // Sum up the relevant fields
      totalExpenses += voucher.amountInFigures;
      // You can include other fields if needed
    });

    return totalExpenses;
  }

  return (
    <CustomPageStarter>
      <RenderHelmet />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "10px",
        }}
      >
        <PageHeading title={`Welcome to ADCon Dashboard`} />

        <h6>{projects.find((p) => p.id === currentProjectId)?.name}</h6>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          flexWrap: "wrap",
          rowGap: "20px",
        }}
      >
        {/* activities chart */}
        <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
          <div className="widget widget-one">
            <div className="widget-heading">
              <h6>Activities</h6>
            </div>
            <div className="w-chart">
              <div className="w-chart-section">
                <div className="w-detail">
                  <p className="w-title">Total Purchase Requests</p>
                  <p className="w-stats">{purchaseRequestsResponse.total}</p>
                </div>
                <div className="w-chart-render-one">
                  <div id="total-users" />
                </div>
              </div>
              <div className="w-chart-section">
                <div className="w-detail">
                  <p className="w-title">Total Payment Vouchers</p>
                  <p className="w-stats">{paymentVouchersResponse.total}</p>
                </div>
                <div className="w-chart-render-one">
                  <div id="paid-visits" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* total expense */}
        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing">
          <div className="widget widget-card-four">
            <div className="widget-content">
              <div className="w-content">
                <div className="w-info">
                  <h6 className="value">
                    $ {calculateTotalExpenses(paymentVouchersResponse.items)}
                  </h6>
                  <p>Expenses</p>
                </div>
                <div>
                  <div className="w-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-home"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="progress">
                <div
                  className="progress-bar bg-gradient-secondary"
                  role="progressbar"
                  style={{ width: "57%" }}
                  aria-valuenow={57}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          </div>
        </div>

        <StatisticEmp count={employeesResponse.items.length} />
        <StatisticsAssets count={assets.length} />
      </div>
      {auth.getCurrentUser()?.role !== "engineer" && (
        <div
          style={{
            display: "flex",
            alignItems: "start",
            flexWrap: "wrap",
          }}
        >
          <div className="mt-5 col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
            <div className="widget p-4 widget-table-two">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
                className="widget-heading"
              >
                <h5>Recent Purchase Requests</h5>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(Routes.Purchase_Requests)}
                  className="text-right"
                >
                  <span>View More</span>
                </div>
              </div>
              <div className="widget-content">
                <div className="table-responsive">
                  <PRTable
                    isFetching={false}
                    purchaseRequestsResponse={purchaseRequestsResponse}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
            <div className="widget p-4 widget-table-two">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
                className="widget-heading"
              >
                <h5>Recent Payment Vouchers</h5>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(Routes.Payment_Voucher)}
                  className="text-right"
                >
                  <span>View More</span>
                </div>
              </div>
              <div className="widget-content">
                <div className="table-responsive">
                  <PVTable
                    isFetching={false}
                    paymentVouchersResponse={paymentVouchersResponse}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </CustomPageStarter>
  );
};

export default Home;
