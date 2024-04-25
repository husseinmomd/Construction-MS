import { FunctionComponent } from "react";
import { FiFileMinus } from "react-icons/fi";

interface StatisticsAssetsProps {
  count: number;
}

export const StatisticsAssets: FunctionComponent<StatisticsAssetsProps> = ({
  count,
}) => {
  return (
    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 custom">
      <div
        style={{
          background: "#ffe7e7",
        }}
        className="widget widget-one_hybrid widget-followers"
      >
        <div className="widget-heading">
          <div className="w-icon">
            <FiFileMinus />
          </div>
          <p className="w-value">{count}</p>
          <h5>Total Assets</h5>
        </div>
      </div>
    </div>
  );
};
