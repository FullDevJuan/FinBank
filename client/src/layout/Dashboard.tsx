import { Routes, Route } from "react-router-dom";
import Nav from "../components/common/Nav";
import Home from "../pages/Home";
import Users from "../pages/Users";
import Products from "../pages/Products";
import CreateProduct from "../components/products/CreateProduct";
import Customers from "../pages/Customers";
import CreateCustomer from "../components/customers/CreateCustomer";
import Transactions from "../pages/Transactions";
import Accounts from "../pages/Accounts";
import Interactions from "../pages/Interactions";
import CreateInteraction from "../components/interactions/CreateInteraction";
import ProtectedRoute from "../components/common/ProtectedRoute";
import AccountDetail from "../components/accounts/AccountDetail";

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
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="/products/edit" element={<CreateProduct />} />
        <Route path="customers" element={<Customers />} />
        <Route path="/customers/create" element={<CreateCustomer />} />
        <Route path="/customers/edit" element={<CreateCustomer />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="/accounts/:id" element={<AccountDetail />}></Route>
        <Route path="interactions" element={<Interactions />} />
        <Route path="/interactions/create" element={<CreateInteraction />} />
        <Route path="/interactions/edit" element={<CreateInteraction />} />
      </Routes>
    </main>
  );
}
