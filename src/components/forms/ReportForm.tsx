import { FunctionComponent, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ReportPostValues, ReportServices } from "../../services";
import { OutlinedButton } from "..";
import toast from "react-hot-toast";
import { ReportType } from "../../core";

interface ReportFormProps {
  path?: string;
  reportType: ReportType | null;
}

export const ReportForm: FunctionComponent<ReportFormProps> = ({
  path,
  reportType,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReportPostValues>();

  const onSubmit: SubmitHandler<ReportPostValues> = async (data) => {
    const toastId = toast.loading("Saving data...");

    const form = new FormData();
    form.append("Remark", data.remark);
    form.append("ReportTypeId", reportType?.id!);
    // @ts-ignore comment
    form.append("File", data.file[0]);

    const reportServices = new ReportServices();

    try {
      const res = await reportServices.create(form);
      console.log(res);
      toast.success("Report created successfully", { id: toastId });
      reset();
    } catch (error) {}
  };

  useEffect(() => {
    reset();
  }, [path]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-4">
          <label htmlFor="description">Add File</label>
          <input
            {...register("file", { required: true })}
            type="file"
            className="form-control"
            id="description"
            placeholder="Description"
          />
          {errors.file && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </div>
        <div className="form-group mb-4">
          <label htmlFor="description">Report Remark</label>
          <textarea
            {...register("remark", { required: true })}
            className="form-control"
            id="description"
            placeholder="Remark"
          />
          {errors.remark && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </div>
        <OutlinedButton type="submit" text="Submit" isLoading={isSubmitting} />
      </form>
    </>
  );
};
