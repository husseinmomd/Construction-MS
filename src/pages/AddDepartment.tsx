import { FunctionComponent } from "react";
import { CustomPageStarter, DepartmentForm, PageHeading } from "../components";

interface AddDepartmentProps {}

const AddDepartment: FunctionComponent<AddDepartmentProps> = () => {
  return (
    <CustomPageStarter>
      <PageHeading title="Create Department" />

      {/* form */}
      <div className="w-50">
        <DepartmentForm />
      </div>
    </CustomPageStarter>
  );
};

export default AddDepartment;
