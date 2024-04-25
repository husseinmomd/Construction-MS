import { FunctionComponent } from "react";
import { FormWrapper } from ".";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { EmployeeCreationRequest } from "../services";

interface EmployeeDocumentProps {
  register: UseFormRegister<EmployeeCreationRequest>;
  errors: FieldErrors<EmployeeCreationRequest>;
}

export const EmployeeDocument: FunctionComponent<EmployeeDocumentProps> = ({
  register,
  errors,
}) => {
  return (
    <FormWrapper title="Employee Document">
      <div className="form-group mb-4">
        <label htmlFor="cvDocumentRef">Employee CV</label>
        <input
          {...register("Cv", { required: true })}
          type="file"
          className="form-control"
          id="cvDocumentRef"
          placeholder="CV"
        />
        {errors.Cv && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
      </div>
      <div className="form-group mb-4">
        <label htmlFor="cvDocumentRef">Employee Job Description</label>
        <input
          {...register("JobDescription", { required: true })}
          type="file"
          className="form-control"
          id="JobDescription"
          placeholder="Job Description"
        />
        {errors.JobDescription && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
      </div>
      <div className="form-group mb-4">
        <label htmlFor="cvDocumentRef">Employee Contract</label>
        <input
          {...register("Contract", { required: true })}
          type="file"
          className="form-control"
          id="Contract"
          placeholder="Contract"
        />
        {errors.Contract && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
      </div>
    </FormWrapper>
  );
};
