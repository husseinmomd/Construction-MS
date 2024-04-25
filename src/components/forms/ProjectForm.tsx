import { FunctionComponent, useState } from "react";
import { OutlinedButton } from "..";
import { ProjectServices } from "../../services";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { Project } from "../../core";
import { useNavigate } from "react-router-dom";
import { setInputDate } from "../../util";

interface ProjectFormProps {
  project: Project | null;
  path: string;
}

export const ProjectForm: FunctionComponent<ProjectFormProps> = ({
  project,
  path,
}) => {
  console.log(path);
  const [projectServices] = useState(new ProjectServices());
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Project>({
    defaultValues:
      {
        ...project,
        startDate: setInputDate(project?.startDate.toString()),
      } ?? {},
  });

  const onSubmit: SubmitHandler<Project> = async (data) => {
    try {
      if (path === "edit") {
        await projectServices.update(data, project?.id!);
        toast.success("Project Update Successfully");
        reset();
        navigate(-1);
        return;
      }
      await projectServices.create(data);
      toast.success("Project saved Successfully");
      reset();
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-4">
        <label htmlFor="name">Project Name</label>
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
        <label htmlFor="description">Project Description</label>
        <input
          {...register("description", { required: true })}
          type="text"
          className="form-control"
          id="description"
          placeholder="Description"
        />
        {errors.description && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
      </div>
      <div className="form-group mb-4">
        <label htmlFor="date">Project Start Date</label>
        <input
          {...register("startDate", { required: true })}
          type="date"
          className="form-control"
          id="date"
        />
        {errors.startDate && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
      </div>
      <OutlinedButton
        type="submit"
        text="Submit"
        disabled={isSubmitting}
        isLoading={isSubmitting}
      />
    </form>
  );
};
