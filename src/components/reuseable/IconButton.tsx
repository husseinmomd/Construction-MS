import { FunctionComponent } from "react";

interface IconButtonProps {
  icon: JSX.Element;
  callback?: () => void;
}

export const IconButton: FunctionComponent<IconButtonProps> = ({
  icon,
  callback,
}) => {
  return (
    <button onClick={callback} className="btn btn-dark rounded-circle">
      {icon}
    </button>
  );
};
