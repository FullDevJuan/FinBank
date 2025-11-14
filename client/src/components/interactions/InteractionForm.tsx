import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { Interaction } from "../../types/interaction.type";
import { getCustomers } from "../../api/interactions.api";
import Span from "../common/Span";

interface Customer {
  id: string;
  name: string;
}

interface InteractionFormProps {
  defaultValues?: Partial<Interaction>;
  APIFunction: (data: any) => void;
}

export default function InteractionForm({
  defaultValues,
  APIFunction,
}: InteractionFormProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      customer_id: defaultValues?.customer_id || "",
      interaction_type: defaultValues?.interaction_type || "llamada",
      subject: defaultValues?.subject || "",
      description: defaultValues?.description || "",
      outcome: defaultValues?.outcome || "pendiente",
    },
  });

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        setIsLoadingCustomers(true);
        const data = await getCustomers();
        if (Array.isArray(data)) {
          setCustomers(data);
        }
      } catch (error) {
        console.error("Error loading customers:", error);
      } finally {
        setIsLoadingCustomers(false);
      }
    };

    loadCustomers();
  }, []);

  const onSubmit = (data: any) => {
    const formattedData: any = {
      customer_id: data.customer_id,
      interaction_type: data.interaction_type,
      subject: data.subject,
      description: data.description,
      outcome: data.outcome,
    };

    // Include id if editing
    if (defaultValues?.id) {
      formattedData.id = defaultValues.id;
    }

    APIFunction(formattedData);
  };

  if (isLoadingCustomers) {
    return <p>Loading customers...</p>;
  }

  return (
    <div className="containerForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="customer_id">Customer</label>
          <select
            id="customer_id"
            {...register("customer_id", {
              required: {
                value: true,
                message: "Required field",
              },
            })}
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          {errors.customer_id && (
            <Span>{String((errors.customer_id as any).message)}</Span>
          )}
        </div>

        <div>
          <label htmlFor="interaction_type">Interaction Type</label>
          <select
            id="interaction_type"
            {...register("interaction_type", {
              required: {
                value: true,
                message: "Required field",
              },
            })}
          >
            <option value="llamada">Llamada</option>
            <option value="correo">Correo</option>
            <option value="reunion">Reunión</option>
            <option value="chat">Chat</option>
          </select>
          {errors.interaction_type && (
            <Span>{String((errors.interaction_type as any).message)}</Span>
          )}
        </div>

        <div>
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            {...register("subject", {
              required: {
                value: true,
                message: "Required field",
              },
            })}
          />
          {errors.subject && (
            <Span>{String((errors.subject as any).message)}</Span>
          )}
        </div>

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
          />
          {errors.description && (
            <Span>{String((errors.description as any).message)}</Span>
          )}
        </div>

        <div>
          <label htmlFor="outcome">Outcome</label>
          <select
            id="outcome"
            {...register("outcome", {
              required: {
                value: true,
                message: "Required field",
              },
            })}
          >
            <option value="exitoso">Exitoso</option>
            <option value="pendiente">Pendiente</option>
            <option value="fallido">Fallido</option>
          </select>
          {errors.outcome && (
            <Span>{String((errors.outcome as any).message)}</Span>
          )}
        </div>

        <button className="save">Save</button>
      </form>
    </div>
  );
}
