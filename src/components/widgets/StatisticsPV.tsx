import { FunctionComponent } from "react";
import { FiLink } from "react-icons/fi";

interface StatisticsPVProps {
  count: number;
}

export const StatisticsPV: FunctionComponent<StatisticsPVProps> = ({
  count,
}) => {
  return (
    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 custom">
      <div
        style={{
          background: "#efefef",
        }}
        className="widget widget-one_hybrid widget-followers"
      >
        <div className="widget-heading">
          <div className="w-icon">
            <FiLink />
          </div>
          <p className="w-value">{count}</p>
          <h5>Total payment vouchers of this project</h5>
        </div>
        <div className="widget-content">
          <div className="w-chart">
            <div id="hybrid_followers" />
          </div>
        </div>
      </div>
    </div>
  );
};
