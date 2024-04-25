import { FunctionComponent } from "react";
import { CiEdit } from "react-icons/ci";

interface EditBadgeProps {
  callback: () => void;
  disabled?: boolean;
}

export const EditBadge: FunctionComponent<EditBadgeProps> = ({
  callback,
  disabled,
}) => {
  return (
    <button
      onClick={callback}
      disabled={disabled}
      className="badge outline-badge-primary"
    >
      <CiEdit size={22} />
    </button>
  );
};
