import { useLocation, useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import { saveProduct, updateProduct } from "../../api/products.api";

export default function CreateProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const isEdit = !!product;

  const handleSave = async (data: any) => {
    try {
      let response;
      if (isEdit) {
        response = await updateProduct(data);
      } else {
        response = await saveProduct(data);
      }

      // Show alert with response message
      alert(response?.msg || "Operation completed");

      // Redirect to products page
      navigate("/dashboard/products");
    } catch (error) {
      alert("Error saving product");
      console.error(error);
    }
  };

  return (
    <section className="content">
      <h1>{isEdit ? "Edit Product" : "Create Product"}</h1>
      <ProductForm defaultValues={product} APIFunction={handleSave} />
    </section>
  );
}
