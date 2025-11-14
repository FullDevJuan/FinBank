import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomerForm from "./CustomerForm";
import RegisterProductModal from "./RegisterProductModal";
import CustomerProductsList from "./CustomerProductsList";
import { saveCustomer, updateCustomer } from "../../api/customers.api";

export default function CreateCustomer() {
  const location = useLocation();
  const navigate = useNavigate();
  const customer = location.state?.customer;
  const isEdit = !!customer;
  const [showProductModal, setShowProductModal] = useState(false);
  const [productRefresh, setProductRefresh] = useState(0);

  const handleSave = async (data: any) => {
    try {
      let response;
      if (isEdit) {
        response = await updateCustomer(data);
      } else {
        response = await saveCustomer(data);
      }

      // Show alert with response message
      alert(response?.msg || "Operation completed");

      // Redirect to customers page
      navigate("/dashboard/customers");
    } catch (error) {
      alert("Error saving customer");
      console.error(error);
    }
  };

  const handleProductRegistrationSuccess = () => {
    setProductRefresh((prev) => prev + 1);
  };

  return (
    <section className="content">
      <h1>{isEdit ? "Edit Customer" : "Create Customer"}</h1>
      <CustomerForm defaultValues={customer} APIFunction={handleSave} />

      {isEdit && customer?.id && (
        <div
          style={{
            marginTop: "40px",
            borderTop: "2px solid #ddd",
            paddingTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2>Associated Products</h2>
            <button
              onClick={() => setShowProductModal(true)}
              className="save"
              style={{ marginBottom: 0 }}
            >
              Register New Product
            </button>
          </div>

          <CustomerProductsList
            customerId={customer.id}
            refreshTrigger={productRefresh}
          />

          {showProductModal && (
            <RegisterProductModal
              customerId={customer.id}
              onClose={() => setShowProductModal(false)}
              onSuccess={handleProductRegistrationSuccess}
            />
          )}
        </div>
      )}
    </section>
  );
}
