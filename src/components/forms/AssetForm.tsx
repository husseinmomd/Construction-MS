import { FunctionComponent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AssetPostValues, AssetServices } from "../../services";
import { Asset, Category } from "../../core";
import { OutlinedButton } from "..";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function RenderHelmet() {
  return (
    <Helmet>
      <link
        rel="stylesheet"
        type="text/css"
        href="/assets/css/forms/switches.css"
      />
    </Helmet>
  );
}

interface AssetFormProps {
  path: string;
  categories?: Category[];
  asset: Asset | null;
}

export const AssetForm: FunctionComponent<AssetFormProps> = ({
  path,
  categories,
  asset,
}) => {
  console.log("asset", asset);
  const navigate = useNavigate();
  const [assetServices] = useState(new AssetServices());

  console.log(categories);
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<AssetPostValues>({
    defaultValues: asset ?? {
      inStock: true,
    },
  });

  const onSubmit: SubmitHandler<AssetPostValues> = async (data) => {
    try {
      if (data.stock >= 1) {
        if (path === "edit") {
          const res = await assetServices.update(data!, asset?.id!);
          console.log(res);
          toast.success("Asset updated Successfully");
          reset();
          navigate("..");
          return;
        }
        const res = await assetServices.create({ ...data, inStock: true });

        toast.success("Asset saved Successfully");
        console.log(res);
        reset();
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  useEffect(() => {
    if (path !== "edit") {
      reset({
        categoryId: "",
        cost: 0,
        description: "",
        name: "",
      });

      return;
    }
  }, [path]);

  return (
    <>
      <RenderHelmet />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-4">
          <label htmlFor="name">Asset Name</label>
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
          <label htmlFor="description">Asset Description</label>
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
          <label htmlFor="cost">Asset Cost</label>
          <input
            {...register("cost" as const, {
              required: true,
            })}
            type="number"
            step=".01"
            className="form-control"
            id="cost"
            placeholder="Cost $"
          />
          {errors.description && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </div>
        {/* in stock switch */}
        {/* <div style={{ display: "flex", alignItems: "center" }}>
          <label className="switch s-icons s-outline s-outline-success">
            <input
              id="inStock"
              {...register("inStock", { required: true })}
              type="checkbox"
            />
            <span className="slider round" />
          </label>
          <label htmlFor="stock">In Stock</label>
        </div> */}
        <div className="form-group mb-4">
          <label htmlFor="stock">Stock</label>
          <input
            {...register("stock" as const, {
              required: true,
              validate: (value) => {
                return (
                  value >= 1 || "Quantity must be greater than or equal to 1"
                );
              },
            })}
            type="number"
            onChange={() => trigger("stock")}
            className="form-control"
            id="stock"
            placeholder="0"
          />
          {errors.description && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </div>

        <div className="form-group mb-4">
          <label htmlFor="formGroupExampleInput2">Choose Category</label>
          <select
            {...register("categoryId", { required: true })}
            className="form-control form-control-lg"
          >
            {categories?.map((category) => (
              <option selected value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <OutlinedButton
          type="submit"
          text="Submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        />
      </form>
    </>
  );
};
