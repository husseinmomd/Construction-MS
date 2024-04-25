import { FunctionComponent, useEffect, useState } from "react";
import {
  CustomPageStarter,
  EmployeeForm,
  OutlinedButton,
  PageHeading,
} from "../components";
import { EmployeeDocument } from "../components";
import { useMultiStepForm } from "../hooks";
import { useForm } from "react-hook-form";
import {
  DepartmentServices,
  EmployeeCreationRequest,
  EmployeeServices,
} from "../services";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Department } from "../core";

interface AddEmployeeProps {
  path: string;
}

interface LocationProp {
  state: {
    item: EmployeeCreationRequest;
  };
  pathname: string;
}

const AddEmployee: FunctionComponent<AddEmployeeProps> = ({ path }) => {
  const navigate = useNavigate();
  const { state } = useLocation() as LocationProp;

  const [employeeServices] = useState(new EmployeeServices());

  // form state
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeCreationRequest>({
    defaultValues: state?.item,
  });

  const [departments, setDepartments] = useState<Department[]>([]);

  // multi steps hook
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      <EmployeeForm
        departments={departments}
        register={register}
        errors={errors}
      />,
      <EmployeeDocument register={register} errors={errors} />,
    ]);

  const onSubmit = handleSubmit(async (data) => {
    if (!data) return;
    if (!isLastStep) return next();
    const form = new FormData();
    // @ts-ignore comment
    form.append("CV", data.Cv[0]);
    // @ts-ignore comment
    form.append("Contract", data.Contract[0]);
    // @ts-ignore comment
    form.append("JobDescription", data.JobDescription[0]);

    if (!form) return;

    // edit state
    if (path === "edit") {
      try {
        const toastId = toast.loading("Saving initial data...");
        const updateNonDocData = await employeeServices.update(
          data,
          state?.item?.id!
        );
        form.append("EmployeeId", updateNonDocData.id!);
        toast.loading("Updating documents", { id: toastId });
        const updateDocData = await employeeServices.uploadDocs(form);
        console.log(updateDocData);
        toast.success("Employee updated successfully", { id: toastId });
        reset();
        navigate("..");
      } catch (error) {
        console.log(error);
      }
      return;
    }

    // creation state
    try {
      const toastId = toast.loading("Saving initial data...");
      const createNonDocData = await employeeServices.create(data);
      form.append("EmployeeId", createNonDocData.id!);
      toast.loading("Saving documents", { id: toastId });
      const createDocData = await employeeServices.uploadDocs(form);
      console.log(createDocData);
      toast.success("Employee created successfully", { id: toastId });

      // reset form
      reset();
      navigate("..");
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    (async () => {
      await new DepartmentServices()
        .getAll()
        .then((data) => setDepartments(data));
    })();

    if (path !== "edit") {
      reset({
        id: "",
        name: "",
        departmentId: "",
        email: "",
        phoneNumber: "",
        position: "",
        Contract: undefined,
        Cv: undefined,
        JobDescription: undefined,
      });

      return;
    }
  }, [path]);

  return (
    <CustomPageStarter>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <PageHeading
            title={
              !isLastStep
                ? "Provide employee information"
                : "Provide employee documents"
            }
          />
        </div>
        <span style={{ fontWeight: "bold" }} className="btn-primary btn-lg">
          {currentStepIndex + 1} / {steps.length}
        </span>
      </div>
      <form onSubmit={onSubmit}>
        {step}
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            marginTop: "20px",
            justifyContent: "flex-end",
          }}
        >
          {!isFirstStep && (
            <OutlinedButton
              disabled={isSubmitting}
              type={"button"}
              callback={back}
              text="Back"
            />
          )}
          <OutlinedButton
            type={"submit"}
            disabled={isSubmitting}
            text={isLastStep ? "Finish" : "Next"}
            isLoading={isSubmitting}
          />
        </div>
      </form>
    </CustomPageStarter>
  );
};

export default AddEmployee;
