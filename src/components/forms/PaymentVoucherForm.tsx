import { FunctionComponent, useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { OutlinedButton } from "..";
import { PurchaseRequest } from "../../core";
import {
  PaymentVoucherPostValues,
  PaymentVoucherServices,
} from "../../services";
import { useNavigate } from "react-router-dom";

interface PaymentVoucherFormProps {
  item: PurchaseRequest;
}

export const PaymentVouchersForm: FunctionComponent<
  PaymentVoucherFormProps
> = ({ item }) => {
  const [pvServices] = useState(new PaymentVoucherServices());
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    trigger,
    formState: { isSubmitting, errors },
  } = useForm<PaymentVoucherPostValues>({
    defaultValues: item,
  });

  const onSubmit: SubmitHandler<PaymentVoucherPostValues> = async (data) => {
    try {
      const res = await pvServices.create({
        ...data,
        requestedBy: item.requestedBy,
        purchaseRequestId: item.id!,
      });
      console.log(res);
      reset();
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "orders",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{
          width: "70%",
        }}
      >
        {fields.map((f, index) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              key={f.id}
            >
              <div className="form-group mb-4">
                <label htmlFor="particular">Particular</label>
                <input
                  disabled
                  {...register(`orders.${index}.particular`)}
                  type="text"
                  className="form-control"
                  id="particular"
                  placeholder="Particular"
                />
                <p style={{ color: "red" }}>Unchangeable Field</p>
              </div>
              <div className="form-group mb-4">
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
                  type="number"
                  className="form-control"
                  id={`orders.${index}.quantity`}
                  placeholder="Quantity"
                  onChange={() => trigger(`orders.${index}.quantity`)}
                />
                {errors?.orders?.[index]?.quantity && (
                  <p style={{ color: "red" }}>
                    {errors?.orders[index]?.quantity?.message}
                  </p>
                )}
              </div>
              <div className="form-group mb-4">
                <label htmlFor={`orders.${index}.price`}>Price</label>
                <input
                  step=".01"
                  {...register(`orders.${index}.price`, {
                    required: "Price is Required",
                    validate: (value) => {
                      return (
                        value >= 1 || "Price must be greater than or equal to 1"
                      );
                    },
                  })}
                  onChange={() => trigger(`orders.${index}.price`)}
                  type="number"
                  className="form-control"
                  id={`orders.${index}.price`}
                  placeholder="Price"
                />
                {errors?.orders?.[index]?.price && (
                  <p style={{ color: "red" }}>
                    {errors?.orders[index]?.price?.message}
                  </p>
                )}
              </div>
              {index > 0 && (
                <button
                  className="btn-outline-danger"
                  onClick={() => remove(index)}
                >
                  X
                </button>
              )}
            </div>
          );
        })}
        <button
          onClick={() =>
            append({
              particular: "",
              quantity: 1,
              price: 1,
            })
          }
          style={{ width: "100%" }}
          className="btn-outline-primary btn-lg mb-5"
        >
          Add
        </button>
      </div>

      <OutlinedButton
        text="Submit Payment Voucher"
        disabled={isSubmitting}
        isLoading={isSubmitting}
        type="submit"
      />
    </form>
  );
};
