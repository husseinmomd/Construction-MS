import { FunctionComponent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CategoryServices } from "../../services";
import { OutlinedButton } from "..";
import { Category } from "../../core";
import toast from "react-hot-toast";

interface CategoryFormProps {}

const CategoryForm: FunctionComponent<CategoryFormProps> = () => {
  const [categoryServices] = useState(new CategoryServices());
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Category>();

  const onSubmit: SubmitHandler<Category> = async (data) => {
    if (!data) return;

    try {
      const res = await categoryServices.create(data);
      toast.success("Saved Successfully");
      reset();
      console.log(res);
    } catch (error) {}
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-4">
        <label htmlFor="name">Category Name</label>
        <input
          {...register("name", { required: true })}
          type="text"
          className="form-control"
          id="name"
          placeholder="Name"
        />
        {errors.name && (
          <span style={{ color: "red" }}>Category name is required</span>
        )}
      </div>
      <OutlinedButton
        text="Submit"
        disabled={isSubmitting}
        isLoading={isSubmitting}
        type="submit"
      />
    </form>
  );
};

export default CategoryForm;
