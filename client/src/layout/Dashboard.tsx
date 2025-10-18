import { Routes, Route } from "react-router-dom";
import Nav from "../components/common/Nav";
import Home from "../pages/Home";
import Users from "../pages/Users";
import Products from "../pages/Products";
import Customers from "../pages/Customers";
import Audit from "../pages/Audit";
import Transactions from "../pages/Transactions";
import Accounts from "../pages/Accounts";
import Interactions from "../pages/Interactions";
import ProtectedRoute from "../components/common/ProtectedRoute";

export default function Dashboard() {
  return (
    <main className="dashboard">
      <Nav />
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="users"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route path="products" element={<Products />} />
        <Route path="customers" element={<Customers />} />
        <Route
          path="audit"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Audit />
            </ProtectedRoute>
          }
        />
        <Route path="transactions" element={<Transactions />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="interactions" element={<Interactions />} />
      </Routes>
    </main>
  );
}
