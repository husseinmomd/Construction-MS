import { Helmet } from "react-helmet";

export function TableAssets() {
  return (
    <Helmet>
      <link
        rel="stylesheet"
        type="text/css"
        href="/plugins/table/datatable/datatables.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="/plugins/table/datatable/dt-global_style.css"
      />

      <script src="/plugins/table/datatable/datatables.js"></script>
    </Helmet>
  );
}
