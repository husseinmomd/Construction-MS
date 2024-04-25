import { FunctionComponent } from "react";

interface DangerBadgeProps {
  text: string;
}

export const DangerBadge: FunctionComponent<DangerBadgeProps> = ({ text }) => {
  return <p className="badge outline-badge-danger">{text}</p>;
};
