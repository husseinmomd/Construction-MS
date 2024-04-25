import { FunctionComponent } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Department } from "../../core";
import { EmployeeCreationRequest } from "../../services";
import { FormWrapper } from "..";

interface EmployeeFormProps {
  register: UseFormRegister<EmployeeCreationRequest>;
  errors: FieldErrors<EmployeeCreationRequest>;
  departments: Department[];
}

export const EmployeeForm: FunctionComponent<EmployeeFormProps> = ({
  register,
  errors,
  departments,
}) => {
  return (
    <FormWrapper title="Employee Info">
      <div className="form-group mb-4">
        <label htmlFor="name">Employee Name</label>
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
      <div className="form-group mb-4">
        <label htmlFor="email">Employee Email Address</label>
        <input
          {...register("email", { required: true })}
          type="email"
          className="form-control"
          id="email"
          placeholder="Email"
        />
        {errors.name && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
      </div>
      <div className="form-group mb-4">
        <label htmlFor="email">Employee Phone Number</label>
        <input
          {...register("phoneNumber", { required: true })}
          type="text"
          className="form-control"
          id="phoneNumber"
          placeholder="Phone Number"
        />
        {errors.name && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
      </div>
      <div className="form-group mb-4">
        <label htmlFor="position">Employee Position</label>
        <input
          {...register("position", { required: true })}
          type="text"
          className="form-control"
          id="position"
          placeholder="Position"
        />
        {errors.position && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
      </div>
      <div className="form-group mb-4">
        <label htmlFor="formGroupExampleInput2">Choose Department</label>
        <select
          {...register("departmentId")}
          className="form-control form-control-lg"
        >
          {departments?.map((departments) => (
            <option selected value={departments.id} key={departments.id}>
              {departments.name}
            </option>
          ))}
          {errors.departmentId && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </select>
      </div>
    </FormWrapper>
  );
};
