import { useForm } from "react-hook-form";
import type { Product, ProductDetails } from "../../types/product.types";
import Span from "../common/Span";

interface ProductFormProps {
  defaultValues?: Product;
  APIFunction: (data: Product) => void;
}

export default function ProductForm({
  defaultValues,
  APIFunction,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ defaultValues });
  const product_type = watch("product_type");

  const onSubmit = (data: Product) => {
    const details: ProductDetails = {};

    if (
      product_type === "cuenta" ||
      product_type === "tarjeta" ||
      product_type === "seguro"
    ) {
      details.management_fee = parseFloat(
        String(data.details.management_fee || 0)
      );
    }

    if (product_type === "cuenta") {
      details.min_amount = parseFloat(String(data.details.min_amount || 0));
      details.account_type = data.details.account_type;
      details.min_amount = data.details.min_amount;
      details.allow_overdraft = data.details.allow_overdraft;
      details.checkbook_included = data.details.checkbook_included;
      details.daily_withdrawal_limit = data.details.daily_withdrawal_limit;
    }
    if (product_type === "credito") {
      details.max_amount = parseFloat(String(data.details.max_amount || 0));
      details.term_months = data.details.term_months;
      details.interest_type = data.details.interest_type;
      details.requires_guarantee = data.details.requires_guarantee;
    }
    if (product_type === "tarjeta") {
      details.interest_rate_arrears = parseFloat(
        String(data.details.interest_rate_arrears || 0)
      );
      details.deadline = data.details.deadline;
      details.max_balance = data.details.max_balance;
    }
    if (product_type === "seguro") {
      details.coverage = data.details.coverage;
      details.insured_value = data.details.insured_value;
      details.deductible = data.details.deductible;
    }
    data.interest_rate = parseFloat(String(data.interest_rate || 0));

    const formattedData: Product = {
      name: data.name,
      product_type: data.product_type,
      description: data.description,
      interest_rate: data.interest_rate,
      status: data.status,
      details,
    };
    APIFunction(formattedData);
  };

  return (
    <div className="containerForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            style={{ borderColor: errors.name && "red" }}
            type="text"
            id="name"
            {...register("name", {
              required: {
                value: true,
                message: "Required field",
              },
            })}
          />
          {errors.name && <Span>{String(errors.name.message)}</Span>}
        </div>
        <div>
          <label htmlFor="product_type">Type</label>
          <select
            id="product_type"
            {...register("product_type", {
              required: {
                value: true,
                message: "Required field",
              },
            })}
          >
            <option value="">Select a type</option>
            <option value="credito">Credit</option>
            <option value="cuenta">Account</option>
            <option value="seguro">Insurance</option>
            <option value="tarjeta">Card</option>
          </select>

          {errors.product_type && (
            <Span>{String(errors.product_type.message)}</Span>
          )}
        </div>

        {/* campos dinamicos según el tipo de producto */}
        {(product_type === "cuenta" ||
          product_type === "tarjeta" ||
          product_type === "seguro") && (
          <div>
            <label htmlFor="management_fee">Management fee</label>
            <input
              type="number"
              defaultValue={0}
              id="management_fee"
              {...register("details.management_fee", {
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "Management fee must be positive",
                },
              })}
            />
            {errors.details?.management_fee && (
              <Span>{String(errors.details.management_fee)}</Span>
            )}
          </div>
        )}

        {/* cuenta */}
        {product_type === "cuenta" && (
          <>
            <div>
              <label htmlFor="account_type">Account type</label>
              <select
                id="account_type"
                {...register("details.account_type", {
                  required: {
                    value: true,
                    message: "Required field",
                  },
                })}
              >
                <option value="">Select an account type</option>
                <option value="ahorros">Savings</option>
                <option value="corriente">Checking</option>
              </select>
              {errors.details?.account_type && (
                <Span>{String(errors.details.account_type.message)}</Span>
              )}
            </div>
            <div>
              <label htmlFor="min_amount">Minimum amount</label>
              <input
                type="number"
                defaultValue={0}
                id="min_amount"
                {...register("details.min_amount", {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Minimum amount must be positive",
                  },
                })}
              />
              {errors.details?.min_amount && (
                <Span>{String(errors.details.min_amount.message)}</Span>
              )}
            </div>
            <section className="sectionCheckboxes">
              <div className="containerCheckbox">
                <label htmlFor="allow_overdraft">Allow overdrafts</label>
                <input
                  type="checkbox"
                  id="allow_overdraft"
                  {...register("details.allow_overdraft")}
                />
              </div>
              <div className="containerCheckbox">
                <label htmlFor="checkbook_included">Checkbook included</label>
                <input
                  type="checkbox"
                  id="checkbook_included"
                  {...register("details.checkbook_included")}
                />
              </div>
            </section>
            <div>
              <label htmlFor="daily_withdrawal_limit">
                Daily withdrawal limit
              </label>
              <input
                type="number"
                defaultValue={0}
                id="daily_withdrawal_limit"
                {...register("details.daily_withdrawal_limit", {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Daily withdrawal limit must be positive",
                  },
                })}
              />
              {errors.details?.daily_withdrawal_limit && (
                <Span>
                  {String(errors.details.daily_withdrawal_limit.message)}
                </Span>
              )}
            </div>
          </>
        )}
        {/* creditos */}
        {product_type === "credito" && (
          <>
            <div>
              <label htmlFor="max_amount">Maximun amount</label>
              <input
                type="number"
                defaultValue={0}
                id="max_amount"
                {...register("details.max_amount", {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Maximun amount must be positive",
                  },
                  required: {
                    value: true,
                    message: "Required field",
                  },
                })}
              />
              {errors.details?.max_amount && (
                <Span>{String(errors.details.max_amount.message)}</Span>
              )}
            </div>
            <div>
              <label htmlFor="term_months">Term months</label>
              <input
                type="number"
                defaultValue={1}
                id="term_months"
                {...register("details.term_months", {
                  valueAsNumber: true,
                  required: {
                    value: true,
                    message: "Required field",
                  },
                  min: {
                    value: 1,
                    message: "Term months must be at least 1",
                  },
                })}
              />
              {errors.details?.term_months && (
                <Span>{String(errors.details.term_months.message)}</Span>
              )}
            </div>
            <div>
              <label htmlFor="interest_type">Interest type</label>
              <input
                defaultValue="fijo"
                type="text"
                id="interest_type"
                {...register("details.interest_type")}
              />
            </div>
            <div className="containerCheckbox">
              <label htmlFor="requires_guarantee">Requires guarantee</label>
              <input
                type="checkbox"
                id="requires_guarantee"
                {...register("details.requires_guarantee")}
              />
            </div>
          </>
        )}
        {/* tarjeta */}
        {product_type === "tarjeta" && (
          <>
            <div>
              <label htmlFor="deadline">Deadline</label>
              <input
                type="number"
                id="deadline"
                {...register("details.deadline", {
                  valueAsNumber: true,
                  required: {
                    value: true,
                    message: "required",
                  },
                  min: {
                    value: 1,
                    message: "Deadline must be at least 1",
                  },
                })}
              />
              {errors.details?.deadline && (
                <Span>{String(errors.details.deadline.message)}</Span>
              )}
            </div>
            <div>
              <label htmlFor="max_balance">Maximun balance</label>
              <input
                type="number"
                id="max_balance"
                {...register("details.max_balance", {
                  valueAsNumber: true,
                  required: {
                    value: true,
                    message: "Required field",
                  },
                  min: {
                    value: 0,
                    message: "Maximun balance must be positive",
                  },
                })}
              />
              {errors.details?.max_balance && (
                <Span>{String(errors.details.max_balance)}</Span>
              )}
            </div>
            <div>
              <label htmlFor="interest_rate_arrears">
                Interest rate on arrears
              </label>
              <input
                type="number"
                step="0.01"
                defaultValue={0.0}
                id="interest_rate_arrears"
                {...register("details.interest_rate_arrears", {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Interest rate on arrears must be positive",
                  },
                })}
              />
              {errors.details?.interest_rate_arrears && (
                <Span>
                  {String(errors.details.interest_rate_arrears.message)}
                </Span>
              )}
            </div>
          </>
        )}

        {/* seguros */}
        {product_type === "seguro" && (
          <>
            <div>
              <label htmlFor="coverage">Coverage</label>
              <textarea
                id="coverage"
                {...register("details.coverage")}
              ></textarea>
            </div>
            <div>
              <label htmlFor="insured_value">Insured value</label>
              <input
                type="number"
                defaultValue={0}
                id="insured_value"
                {...register("details.insured_value", {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Insured value must be positive",
                  },
                })}
              />
              {errors.details?.insured_value && (
                <Span>{String(errors.details.insured_value.message)}</Span>
              )}
            </div>
            <div>
              <label htmlFor="deductible">Deductible</label>
              <input
                type="number"
                defaultValue={0}
                id="deductible"
                {...register("details.deductible", {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Deductible must be positive",
                  },
                })}
              />
              {errors.details?.deductible && (
                <Span>{String(errors.details.deductible.message)}</Span>
              )}
            </div>
          </>
        )}

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register("description", {
              required: {
                value: true,
                message: "Required field",
              },
            })}
          ></textarea>
          {errors.description && (
            <Span>{String(errors.description.message)}</Span>
          )}
        </div>

        <div>
          <label htmlFor="interest_rate">Interest rate</label>
          <input
            type="number"
            step="0.01"
            defaultValue={0.0}
            id="interest_rate"
            {...register("interest_rate", {
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Interest rate must be positive",
              },
            })}
          />
          {errors.interest_rate && (
            <Span>{String(errors.interest_rate.message)}</Span>
          )}
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            {...register("status", {
              required: {
                value: true,
                message: "Required field",
              },
            })}
          >
            <option value="">Select a status</option>
            <option value="activo">Active</option>
            <option value="inactivo">Inactive</option>
          </select>
          {errors.status && <Span>{String(errors.status.message)}</Span>}
        </div>
        <button className="save">Save</button>
      </form>
    </div>
  );
}
