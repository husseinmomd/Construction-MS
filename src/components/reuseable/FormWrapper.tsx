import { FunctionComponent, ReactNode } from "react";
import { PageHeading } from "..";

interface FormWrapperProps {
  title: string;
  children: ReactNode;
}

export const FormWrapper: FunctionComponent<FormWrapperProps> = ({
  title,
  children,
}) => {
  return (
    <div className="border p-4 mt-4">
      <PageHeading title={title} />
      <div>{children}</div>
    </div>
  );
};
