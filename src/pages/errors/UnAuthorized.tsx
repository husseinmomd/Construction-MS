import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { OutlinedButton } from "../../components";

interface UnAuthorizedProps {}

const UnAuthorized: FunctionComponent<UnAuthorizedProps> = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="widget-content widget-content-area">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <h5 style={{ fontSize: "22px" }}>🚫 UnAuthorized! 🚫</h5>
          <h6 style={{ fontSize: "22px" }}>
            The page you requested is UnAuthorized for this user!
          </h6>
          <OutlinedButton callback={() => navigate(-1)} text="Go Back" />
        </div>
      </div>
    </div>
  );
};

export default UnAuthorized;
