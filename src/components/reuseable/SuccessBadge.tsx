import { FunctionComponent } from "react";

interface SuccessBadgeProps {
  text: string;
}

export const SuccessBadge: FunctionComponent<SuccessBadgeProps> = ({
  text,
}) => {
  return <p className="badge outline-badge-success">{text}</p>;
};
