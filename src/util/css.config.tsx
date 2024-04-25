import { Helmet } from "react-helmet";

export function CSSWrapper() {
  return (
    <Helmet>
      {/* css only */}

      <link href="/assets/css/loader.css" rel="stylesheet" type="text/css" />
      <script src="/assets/js/loader.js"></script>
      {/* <!-- BEGIN GLOBAL MANDATORY STYLES --> */}
      <link
        href="https://fonts.googleapis.com/css?family=Nunito:400,600,700"
        rel="stylesheet"
      />
      <link
        href="/bootstrap/css/bootstrap.min.css"
        rel="stylesheet"
        type="text/css"
      />
      <link href="/assets/css/plugins.css" rel="stylesheet" type="text/css" />
      {/* <!-- END GLOBAL MANDATORY STYLES --> */}

      {/* <!-- BEGIN PAGE LEVEL PLUGINS/CUSTOM STYLES --> */}
      <link
        href="/plugins/apex/apexcharts.css"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="/assets/css/dashboard/dash_2.css"
        rel="stylesheet"
        type="text/css"
      />
      {/* <!-- END PAGE LEVEL PLUGINS/CUSTOM STYLES --> */}

      {/* js only */}
      {/* <!-- BEGIN GLOBAL MANDATORY SCRIPTS --> */}
      <script src="/assets/js/libs/jquery-3.1.1.min.js"></script>
      <script src="/bootstrap/js/popper.min.js"></script>
      <script src="/bootstrap/js/bootstrap.min.js"></script>
      <script src="/plugins/perfect-scrollbar/perfect-scrollbar.min.js"></script>
      <script src="/assets/js/app.js"></script>

      <script src="/assets/js/custom.js"></script>
      {/* <!-- END GLOBAL MANDATORY SCRIPTS --> */}

      {/* <!-- BEGIN PAGE LEVEL PLUGINS/CUSTOM SCRIPTS --> */}
      <script src="/plugins/apex/apexcharts.min.js"></script>
      <script src="/assets/js/dashboard/dash_2.js"></script>
      {/* <!-- BEGIN PAGE LEVEL PLUGINS/CUSTOM SCRIPTS --> */}
    </Helmet>
  );
}
