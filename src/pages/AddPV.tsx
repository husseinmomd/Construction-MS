import { FunctionComponent } from "react";
import {
  CustomPageStarter,
  PageHeading,
  PaymentVouchersForm,
} from "../components";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { PurchaseRequest } from "../core";

interface AddPVProps {}
interface Prop {
  state: {
    item: PurchaseRequest;
  };
}
const AddPV: FunctionComponent<AddPVProps> = () => {
  const location = useLocation() as Prop;
  const navigate = useNavigate();

  return (
    <CustomPageStarter>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          <BiArrowBack />
        </button>
        <PageHeading title="Create Payment Voucher" />
      </div>
      <div className="mt-3 mb-2">
        {/* form */}
        <PaymentVouchersForm item={location.state.item} />
      </div>
    </CustomPageStarter>
  );
};

export default AddPV;
