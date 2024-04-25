import { CSSWrapper } from "../util";
import { Navbar, Header, Sidebar } from "./components";
import { FunctionComponent } from "react";

interface LayoutComponentProps {
  children: React.ReactNode;
}

const LayoutComponent: FunctionComponent<LayoutComponentProps> = ({
  children,
}) => {
  return (
    <>
      <CSSWrapper />
      <Header />
      <Navbar />
      <div className="main-container" id="container">
        <div className="overlay"></div>
        <div className="search-overlay"></div>
        <Sidebar />
        <div id="content" className="main-content">
          <div className="layout-px-spacing">
            <div className="layout-top-spacing">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutComponent;
