import { FunctionComponent, useState } from "react";

interface OverLayComponentProps {}

export const OverLayComponent: FunctionComponent<
  OverLayComponentProps
> = () => {
  const [isOverlayVisible, setOverlayVisible] = useState(true);

  const handleOverlayClick = (): void => {
    setOverlayVisible(true);
    setTimeout(() => {
      setOverlayVisible(false);
    }, 2000);
  };

  return (
    <div style={{ position: "absolute", width: "100%" }}>
      <div id="overlay-custom" onClick={handleOverlayClick}>
        Click to show overlay
      </div>
      {isOverlayVisible && (
        <div
          style={{
            border: 0,
            padding: "10px 15px",
            color: "#fff",
            width: "100%",
            height: "200px",

            backgroundColor: "#0e1726",
          }}
          id="custom-overlay"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="feather feather-loader spin"
          >
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
        </div>
      )}
    </div>
  );
};
