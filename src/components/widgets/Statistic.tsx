import { FunctionComponent } from "react";
import { FiUsers } from "react-icons/fi";

interface StatisticProps {
  count: number;
}

export const StatisticEmp: FunctionComponent<StatisticProps> = ({ count }) => {
  return (
    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 custom">
      <div className="widget widget-one_hybrid widget-followers">
        <div className="widget-heading">
          <div className="w-icon">
            <FiUsers />
          </div>
          <p className="w-value">{count}</p>
          <h5>Total Employees</h5>
        </div>
      </div>
    </div>
  );
};
