import Button from "../common/Button";
import { useForm } from "react-hook-form";
import Span from "../common/Span";
import { type Users } from "../../types/user.types";

type Props = {
  defaultValues?: Users;
  onSubmit: (data: Users) => void;
};

function Form({ defaultValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  return (
    <form className="modalForm" onSubmit={handleSubmit(onSubmit)}>
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
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: {
              value: true,
              message: "Required field",
            },
          })}
        />
        {errors.username && <Span>{String(errors.username.message)}</Span>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          {...register("email", {
            required: {
              value: true,
              message: "Required field",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email",
            },
          })}
        />
        {errors.email && <Span>{String(errors.email.message)}</Span>}
      </div>
      <div>
        <label htmlFor="rol">Rol</label>
        <input
          id="rol"
          type="text"
          {...register("rol", {
            required: { value: true, message: "Required field" },
          })}
        />
        {errors.rol && <Span>{String(errors.rol.message)}</Span>}
      </div>
      <div>
        <label htmlFor="pass">Password</label>
        <input
          type="text"
          id="pass"
          {...register("pass", {
            required: {
              value: true,
              message: "Required field",
            },
          })}
        />
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          {...register("edad", {
            required: {
              value: true,
              message: "Required field",
            },
          })}
        />
        {errors.edad && <Span>{String(errors.edad.message)}</Span>}
      </div>
      <Button className="saveUser">Save</Button>
    </form>
  );
}

export default Form;
