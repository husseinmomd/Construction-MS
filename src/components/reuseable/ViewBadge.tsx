import { FunctionComponent } from "react";
import { AiOutlineEye } from "react-icons/ai";

interface ViewBadgeProps {
  href: string;
}

export const ViewBadge: FunctionComponent<ViewBadgeProps> = ({ href }) => {
  return (
    <a className="badge outline-badge-success" href={href}>
      <AiOutlineEye size={15} />
    </a>
  );
};
