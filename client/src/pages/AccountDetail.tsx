import { useParams } from "react-router-dom";

export default function AccountDetail() {
  const { id } = useParams();
  return (
    <section className="content">
      <h1>Account: {id}</h1>
    </section>
  );
}
