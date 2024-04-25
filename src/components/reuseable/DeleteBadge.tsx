import { FunctionComponent } from "react";
import { MdDeleteOutline } from "react-icons/md";

interface DeleteBadgeProps {
  callback: () => void;
  disabled?: boolean;
}

export const DeleteBadge: FunctionComponent<DeleteBadgeProps> = ({
  callback,
  disabled,
}) => {
  return (
    <button
      onClick={callback}
      disabled={disabled}
      className="badge outline-badge-danger"
    >
      <MdDeleteOutline size={22} />
    </button>
  );
};
