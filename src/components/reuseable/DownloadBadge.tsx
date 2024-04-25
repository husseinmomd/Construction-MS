import { FunctionComponent } from "react";
import { MdDownload } from "react-icons/md";

interface DownloadBadgeProps {
  href: string;
}

export const DownloadBadge: FunctionComponent<DownloadBadgeProps> = ({
  href,
}) => {
  return (
    <a className="badge outline-badge-success" href={href}>
      <MdDownload size={15} />
    </a>
  );
};
