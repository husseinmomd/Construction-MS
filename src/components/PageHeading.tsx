import { FunctionComponent } from "react";

interface PageHeadingProps {
  title: string;
}

export const PageHeading: FunctionComponent<PageHeadingProps> = ({ title }) => {
  return (
    <div className="row">
      <div className="col-xl-12 col-md-12 col-sm-12 col-12">
        <h4 style={{ fontWeight: "bold" }}>{title}</h4>
      </div>
    </div>
  );
};
