import { Helmet } from "react-helmet";
import { FunctionComponent, useEffect } from "react";
import { LoginForm } from "../../components";
import { ApiClient } from "../../apiClient";
import { useNavigate } from "react-router-dom";

function AddHelmet() {
  return (
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css?family=Nunito:400,600,700"
        rel="stylesheet"
      />
      <link
        href="bootstrap/css/bootstrap.min.css"
        rel="stylesheet"
        type="text/css"
      />
      <link href="assets/css/plugins.css" rel="stylesheet" type="text/css" />
      <link
        href="assets/css/authentication/form-2.css"
        rel="stylesheet"
        type="text/css"
      />
      <script src="assets/js/libs/jquery-3.1.1.min.js"></script>
      <script src="bootstrap/js/popper.min.js"></script>
      <script src="bootstrap/js/bootstrap.min.js"></script>
    </Helmet>
  );
}

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const apiClient = new ApiClient();
    if (apiClient.checkAuth()) {
      navigate("/dashboard");
      return;
    }
  }, []);
  return (
    <div className="form">
      <AddHelmet />
      <div className="form-container outer">
        <div className="form-form">
          <div className="form-form-wrap">
            <div className="form-container">
              <div className="form-content">
                <h1>Sign In</h1>
                <p>Log in to your account to continue.</p>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
