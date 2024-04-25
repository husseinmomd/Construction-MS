import { FunctionComponent } from "react";

interface CustomIconProps {
  text?: string;
  icon: JSX.Element;
  state?: "pending" | "accepted";
  callback?: () => void;
}

export const CustomIcon: FunctionComponent<CustomIconProps> = ({
  text,
  icon,
  state = "accepted",
  callback,
}) => {
  return (
    <button
      onClick={callback}
      className={
        state === "pending"
          ? "badge outline-badge-warning"
          : "badge outline-badge-success"
      }
    >
      {text && <span>{text}</span>}
      {icon}
    </button>
  );
};
