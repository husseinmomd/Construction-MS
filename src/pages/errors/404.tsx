import { FunctionComponent } from "react";
import { OutlinedButton } from "../../components";
import { useNavigate } from "react-router-dom";

interface NotFoundProps {}

const NotFound: FunctionComponent<NotFoundProps> = () => {
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
          <h5 style={{ fontSize: "22px" }}>🚫 Ooops! 🚫</h5>
          <h6 style={{ fontSize: "22px" }}>
            The page you requested was not found!
          </h6>
          <OutlinedButton callback={() => navigate(-1)} text="Go Back" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
