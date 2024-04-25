import { FunctionComponent } from "react";
import { CustomPageStarter, PageHeading } from "../components";
import CategoryForm from "../components/forms/CategoryForm";

interface AddCategoryProps {}

const AddCategory: FunctionComponent<AddCategoryProps> = () => {
  return (
    <CustomPageStarter>
      <PageHeading title="Create Category" />

      {/* form */}
      <div className="w-50">
        <CategoryForm />
      </div>
    </CustomPageStarter>
  );
};

export default AddCategory;
