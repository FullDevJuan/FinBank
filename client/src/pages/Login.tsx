import { useForm } from "react-hook-form";
import { type UsersLogin } from "../types/user.types";
import { type Login } from "../types/user.types";
import { useState } from "react";
import "./login.css";

export default function Login({ onSubmit }: Login) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsersLogin>();

  const handleFormSubmit = async (data: UsersLogin) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pearl-mist-background-container">
      {/* Pearl Mist Background with Top Glow */}
      <div className="pearl-mist-overlay" />

      {/* Login Content */}
      <div className="pearl-mist-content-container">
        <header className="loginHeader">
          <img src="/finbank.png" alt="logo" />
          <h1>FinBank</h1>
        </header>
        <div className="login">
          <header>
            <h1>Login to your account</h1>
            <p>Enter your email below to login to your account</p>
          </header>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="error">{String(errors.email.message)}</span>
              )}
            </div>
            <div>
              <label htmlFor="pass">Password</label>
              <input
                id="pass"
                type="password"
                {...register("pass", {
                  required: { value: true, message: "Password is required" },
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.pass && (
                <span className="error">{String(errors.pass.message)}</span>
              )}
            </div>
            <div>
              <button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          <button
            onClick={() => {
              throw new Error("This is your first error!");
            }}
          >
            Break the world
          </button>
        </div>
      </div>
    </div>
  );
}
