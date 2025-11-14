import { useForm } from "react-hook-form";
import type { Customer } from "../../types/customer.type";
import Span from "../common/Span";

interface CustomerFormProps {
  defaultValues?: Partial<Customer>;
  APIFunction: (data: Customer) => void;
}

export default function CustomerForm({
  defaultValues,
  APIFunction,
}: CustomerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data: any) => {
    const formattedData: Customer = {
      name: data.name,
      document_type: data.document_type,
      document_number: data.document_number,
      email: data.email,
      phone: data.phone,
      address: data.address,
      birth_date: data.birth_date,
    } as Customer;

    // Include id if editing
    if (data.id) {
      formattedData.id = data.id;
    }

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
          <label htmlFor="document_type">Document Type</label>
          <select
            id="document_type"
            {...register("document_type", {
              required: {
                value: true,
                message: "Required field",
              },
            })}
          >
            <option value="">Select a document type</option>
            <option value="CC">CC - Cédula de Ciudadanía</option>
            <option value="CE">CE - Cédula de Extranjería</option>
            <option value="TI">TI - Tarjeta de Identidad</option>
            <option value="PAS">PAS - Pasaporte</option>
          </select>
          {errors.document_type && (
            <Span>{String(errors.document_type.message)}</Span>
          )}
        </div>

        <div>
          <label htmlFor="document_number">Document Number</label>
          <input
            style={{ borderColor: errors.document_number && "red" }}
            type="text"
            id="document_number"
            {...register("document_number", {
              required: {
                value: true,
                message: "Required field",
              },
            })}
          />
          {errors.document_number && (
            <Span>{String(errors.document_number.message)}</Span>
          )}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            style={{ borderColor: errors.email && "red" }}
            type="email"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "Required field",
              },
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <Span>{String(errors.email.message)}</Span>}
        </div>

        <div>
          <label htmlFor="phone">Phone</label>
          <input
            style={{ borderColor: errors.phone && "red" }}
            type="tel"
            id="phone"
            {...register("phone", {
              required: {
                value: true,
                message: "Required field",
              },
            })}
          />
          {errors.phone && <Span>{String(errors.phone.message)}</Span>}
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input
            style={{ borderColor: errors.address && "red" }}
            type="text"
            id="address"
            {...register("address", {
              required: {
                value: true,
                message: "Required field",
              },
            })}
          />
          {errors.address && <Span>{String(errors.address.message)}</Span>}
        </div>

        <div>
          <label htmlFor="birth_date">Birth Date</label>
          <input
            style={{ borderColor: errors.birth_date && "red" }}
            type="date"
            id="birth_date"
            {...register("birth_date", {
              required: {
                value: true,
                message: "Required field",
              },
            })}
          />
          {errors.birth_date && (
            <Span>{String(errors.birth_date.message)}</Span>
          )}
        </div>

        <button className="save">Save</button>
      </form>
    </div>
  );
}
