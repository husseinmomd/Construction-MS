import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthServices } from "../services/authService";
import { Routes } from "../routes";
import toast from "react-hot-toast";

interface LoginFormProps {}

export const LoginForm: FunctionComponent<LoginFormProps> = () => {
  const [authServices] = useState(new AuthServices());
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormFields>();

  type FormFields = { email: string; password: string };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const res = await authServices.login(data);
      if (!res) {
        toast.error("You have entered an invalid username or password!");
        return;
      }
      navigate(Routes.Projects);
      reset({
        password: "",
      });
    } catch (error) {
      console.log("login error:", error);
      toast.error("You have entered an invalid username or password");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-left">
      <div className="form">
        <div id="username-field" className="field-wrapper input">
          <label htmlFor="email">Email Address</label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-user"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx={12} cy={7} r={4} />
          </svg>
          <input
            {...register("email", { required: true })}
            id="email"
            type="email"
            className="form-control"
            placeholder="e.g adocn@mail.com"
          />

          {errors.email && (
            <span style={{ color: "red" }}>Email is required</span>
          )}
        </div>
        <div id="password-field" className="field-wrapper input mb-2">
          <div className="d-flex justify-content-between">
            <label htmlFor="password">PASSWORD</label>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-lock"
          >
            <rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <input
            {...register("password", { required: true })}
            id="password"
            type="password"
            className="form-control"
            placeholder="Password"
          />
          {errors.password && (
            <span style={{ color: "red" }}>Password is required</span>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            id="toggle-password"
            className="feather feather-eye"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx={12} cy={12} r={3} />
          </svg>
        </div>
        <div className="d-sm-flex justify-content-between">
          <div className="field-wrapper">
            {isSubmitting ? (
              <button type="submit" className="btn btn-primary">
                <span className="spinner-grow text-white mr-2 align-self-center loader-sm"></span>
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                Log In{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};
