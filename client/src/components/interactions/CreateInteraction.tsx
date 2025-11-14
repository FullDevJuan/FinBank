import { useLocation, useNavigate } from "react-router-dom";
import InteractionForm from "./InteractionForm";
import { saveInteraction, updateInteraction } from "../../api/interactions.api";

export default function CreateInteraction() {
  const location = useLocation();
  const navigate = useNavigate();
  const interaction = location.state?.interaction;
  const isEdit = !!interaction;

  const handleSave = async (data: any) => {
    try {
      let response;
      if (isEdit) {
        response = await updateInteraction(data);
      } else {
        response = await saveInteraction(data);
      }

      // Show alert with response message
      alert(response?.msg || "Operation completed");

      // Redirect to interactions page
      navigate("/dashboard/interactions");
    } catch (error) {
      alert("Error saving interaction");
      console.error(error);
    }
  };

  return (
    <section className="content">
      <h1>{isEdit ? "Edit Interaction" : "Create Interaction"}</h1>
      <InteractionForm defaultValues={interaction} APIFunction={handleSave} />
    </section>
  );
}
