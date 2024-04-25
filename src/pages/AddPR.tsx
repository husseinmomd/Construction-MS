import { FunctionComponent } from "react";
import {
  CustomPageStarter,
  PageHeading,
  PurchaseRequestsForm,
} from "../components";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface AddPRProps {}
const AddPR: FunctionComponent<AddPRProps> = () => {
  const navigate = useNavigate();

  return (
    <CustomPageStarter>
      <div
        className="pb-2"
        style={{ display: "flex", alignItems: "center", gap: "12px" }}
      >
        <button
          onClick={() => navigate(-1)}
          className="btn outline-badge-primary"
        >
          <BiArrowBack />
        </button>
        <PageHeading title="Create Purchase Request" />
      </div>
      <div className="mt-3 mb-2">
        {/* form */}
        <PurchaseRequestsForm />
      </div>
    </CustomPageStarter>
  );
};

export default AddPR;
