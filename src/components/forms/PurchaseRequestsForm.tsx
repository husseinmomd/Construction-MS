import { FunctionComponent, useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import {
  PurchaseRequestPostValues,
  PurchaseRequestServices,
} from "../../services";
import { OutlinedButton } from "..";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface PurchaseRequestsFormProps {}

export const PurchaseRequestsForm: FunctionComponent<
  PurchaseRequestsFormProps
> = () => {
  const [prRequests] = useState(new PurchaseRequestServices());
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    control,
    formState: { isSubmitting, errors },
  } = useForm<PurchaseRequestPostValues>({
    defaultValues: {
      orders: [
        {
          particular: "",
          quantity: 1,
          quantityType: "",
          remark: "",
        },
      ],
    },
  });

  const onSubmit:SubmitHandler<PurchaseRequestPostValues> = async(data) => {
    try {
      const res = await prRequests.create(data);
      reset();
      navigate(-1);
      console.log(res);
    } catch (error) {
      toast.error(error as string);
    }
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: "orders",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{
          width: "100%",
        }}
      >
        {fields.map((f, index) => {
          return (
            <div
              style={{
                display: "flex",
                // alignItems: "center",
                columnGap: "10px",
              }}
              key={f.id}
            >
              <div style={{ width: "30%" }} className="form-group mb-4">
                <label htmlFor="particular">Particular</label>
                <input
                  {...register(`orders.${index}.particular`, {
                    required: "This field is required",
                  })}
                  type="text"
                  className="form-control mb-2"
                  id="particular"
                  placeholder="Particular"
                />
                {errors?.orders?.[index]?.particular && (
                  <p style={{ color: "red" }}>
                    {errors?.orders?.[index]?.particular?.message}
                  </p>
                )}
              </div>

              <div style={{ width: "13%" }} className="form-group mb-4">
                <label htmlFor={`orders.${index}.quantity`}>Quantity</label>
                <input
                  {...register(`orders.${index}.quantity` as const, {
                    required: "This Field is Required",
                    validate: (value) => {
                      return (
                        value >= 1 ||
                        "Quantity must be greater than or equal to 1"
                      );
                    },
                  })}
                  onChange={() => trigger(`orders.${index}.quantity`)}
                  type="number"
                  className="form-control mb-2"
                  id={`orders.${index}.quantity`}
                  placeholder="Quantity"
                />
                {errors?.orders?.[index]?.quantity && (
                  <p style={{ color: "red" }}>
                    {errors?.orders[index]?.quantity?.message}
                  </p>
                )}
              </div>
              <div style={{ width: "30%" }} className="form-group mb-4">
                <label htmlFor="quantityType">Quantity Type</label>
                <input
                  {...register(`orders.${index}.quantityType`, {})}
                  type="text"
                  className="form-control mb-2"
                  id="quantityType"
                  placeholder="Quantity Type"
                />
              </div>
              <div className="form-group w-50 mb-4">
                <label htmlFor="remark">Remark</label>
                <input
                  {...register(`orders.${index}.remark`, { required: true })}
                  type="text"
                  className="form-control mb-2"
                  id="remark"
                  placeholder="Remark"
                />
                {errors?.orders?.[index]?.particular && (
                  <p style={{ color: "red" }}>This field is required</p>
                )}
              </div>
              {index > 0 && (
                <div className="pl-3">
                  <button
                    style={{
                      fontSize: "20px",
                      marginTop: "35px",
                    }}
                    className="btn-outline-danger"
                    onClick={() => remove(index)}
                  >
                    X
                  </button>
                </div>
              )}
            </div>
          );
        })}
        <button
          onClick={() =>
            append({
              particular: "",
              quantity: 1,
              remark: "",
              quantityType: "",
            })
          }
          style={{ width: "100%" }}
          className="btn-outline-primary btn-lg mb-5"
        >
          Add
        </button>
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
