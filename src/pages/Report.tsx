import { FunctionComponent, useEffect, useState } from "react";
import { CustomPageStarter, PageHeading, ReportForm } from "../components";
import { ReportType } from "../core";
import { ReportServices } from "../services";

interface ReportProps {
  path?: string;
}

const Report: FunctionComponent<ReportProps> = ({ path }) => {
  console.log(path);
  const [reportType, setReportType] = useState<ReportType | null>();
  const [reportTypes, setReportTypes] = useState<ReportType[]>([]);

  async function getReportTypes() {
    await new ReportServices().getTypes().then((data) => setReportTypes(data));
  }

  useEffect(() => {
    (async () => {
      await getReportTypes();
      const isFinance =
        path === "finance/add"
          ? reportTypes.find((x) => x.name === "finance")
          : reportTypes.find((x) => x.name === "work");

      setReportType(isFinance);
    })();
  }, []);

  return (
    <CustomPageStarter>
      <PageHeading
        title={
          path === "finance/add"
            ? "Create A Financial Report"
            : "work/add"
            ? "Create A Work Report"
            : "Edit Report"
        }
      />
      <div className="w-50">
        <ReportForm reportType={reportType!} path={path} />
      </div>
    </CustomPageStarter>
  );
};

export default Report;
