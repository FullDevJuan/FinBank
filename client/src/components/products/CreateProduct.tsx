import ProductForm from "./ProductForm";

export default function CreateProduct() {
  return (
    <section className="content">
      <h1>Create Product</h1>
      <ProductForm APIFunction={(data) => console.log(data)} />
    </section>
  );
}
