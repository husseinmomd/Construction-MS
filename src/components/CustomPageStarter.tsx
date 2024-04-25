import { FunctionComponent } from "react";

interface CustomPageStarterProps {
  children: React.ReactNode;
}

export const CustomPageStarter: FunctionComponent<CustomPageStarterProps> = ({
  children,
}) => <div className="widget-content widget-content-area my-5">{children}</div>;
