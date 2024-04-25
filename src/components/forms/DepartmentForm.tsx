import { FunctionComponent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { OutlinedButton } from "..";
import { DepartmentServices } from "../../services";
import { Department } from "../../core";
import toast from "react-hot-toast";

interface DepartmentFormProps {}

export const DepartmentForm: FunctionComponent<DepartmentFormProps> = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Department>();

  const onSubmit: SubmitHandler<Department> = async (data) => {
    try {
      const departmentServices = new DepartmentServices();

      await departmentServices.create(data);
      toast.success("Saved Successfully");
      reset();
    } catch (error) {
      toast.error("error");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-4">
        <label htmlFor="name">Department Name</label>
        <input
          {...register("name", { required: true })}
          type="text"
          className="form-control"
          id="name"
          placeholder="Name"
        />
        {errors.name && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
      </div>

      <OutlinedButton text="Submit" isLoading={isSubmitting} type="submit" />
    </form>
  );
};
