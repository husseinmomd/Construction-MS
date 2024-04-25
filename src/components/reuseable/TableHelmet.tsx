import { FunctionComponent } from "react";
import { Helmet } from "react-helmet";

interface TableHelmetProps {}

export const TableHelmet: FunctionComponent<TableHelmetProps> = () => {
  return (
    <Helmet>
      <link
        href="/assets/css/scrollspyNav.css"
        rel="stylesheet"
        type="text/css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="/assets/css/forms/theme-checkbox-radio.css"
      />
      <link
        href="/assets/css/tables/table-basic.css"
        rel="stylesheet"
        type="text/css"
      />
      <script src="/plugins/table/datatable/datatables.js"></script>
      <script src="/assets/js/scrollspyNav.js"></script>
    </Helmet>
  );
};
