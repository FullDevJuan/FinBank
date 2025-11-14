import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./layout/Dashboard";
import { loginUser } from "./api/users.api";
import type { UsersLogin } from "./types/user.types";
import { useNavigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const navigate = useNavigate();

  const handleLogin = async (data: UsersLogin) => {
    const result = await loginUser(data);
    if (result.success) {
      navigate("/dashboard");
    } else {
      alert("Login failed: " + result.error);
    }
  };

  // Verificar si el usuario está autenticado
  const isAuthenticated = sessionStorage.getItem("token") !== null;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onSubmit={handleLogin} />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onSubmit={handleLogin} />
            )
          }
        />
        <Route
          path="/dashboard/*"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
      <Analytics />
    </>
  );
}

export default App;
