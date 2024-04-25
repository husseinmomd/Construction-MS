import { FunctionComponent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Role, User } from "../../core";
import { UserPostValues, UserServices } from "../../services";
import { OutlinedButton } from "..";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface UserFormProps {
  roles: Role[] | undefined;
  user: User | null;
  path: string | null;
}

export const UserForm: FunctionComponent<UserFormProps> = ({
  roles,
  user,
  path,
}) => {
  const [userServices] = useState(new UserServices());
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserPostValues>({
    defaultValues: user ?? {},
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UserPostValues> = async (data) => {
    try {
      if (path === "edit") {
        await userServices.update(data, user?.id!);
        reset();
        toast.success("User Update Successfully");
        navigate(-1);
        return;
      }
      await userServices.create(data);
      reset();
      toast.success("User Created Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (path !== "edit") {
      reset({
        email: "",
        password: "",
        roleId: "",
        username: "",
      });
    }
  }, [path]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-4">
        <label htmlFor="username">Username</label>
        <input
          {...register("username", { required: true })}
          type="text"
          className="form-control"
          id="username"
          placeholder="User Name"
        />
        {errors.username && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
      </div>
      <div className="form-group mb-4">
        <label htmlFor="email">Email Address</label>
        <input
          {...register("email", { required: true })}
          className="form-control"
          id="email"
          type="email"
          placeholder="Email"
        />
        {errors.email && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
      </div>
      {!user && (
        <div className="form-group mb-4">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", { required: true })}
            className="form-control"
            id="password"
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </div>
      )}
      <div className="form-group mb-4">
        <label htmlFor="formGroupExampleInput2">Role</label>
        <select
          {...register("roleId")}
          className="form-control form-control-lg"
        >
          {roles?.map((role) => (
            <option
              selected
              defaultChecked
              defaultValue={path === "edit" ? user?.roleId : role.id}
              value={role.id}
              key={role.id}
            >
              {role.name}
            </option>
          ))}
        </select>
      </div>
      <OutlinedButton
        type="submit"
        text={path === "edit" ? "Edit" : "Submit"}
        isLoading={isSubmitting}
      />
    </form>
  );
};
