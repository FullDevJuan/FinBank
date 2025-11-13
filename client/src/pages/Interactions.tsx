import { useEffect, useState } from "react";
import type { Interaction } from "../types/interaction.type";
import { getInteractions } from "../api/interactions.api";
import InteractionCard from "../components/interactions/InteractionCard";
import "./interactions.css";

export default function Interactions() {
  const [interactions, setInteractions] = useState<Interaction[] | null>(null);
  const [IsLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    getInteractions()
      .then((data) => {
        if (data.msg) {
          setError(data.msg);
          setInteractions(null);
        } else {
          setError("");
          setInteractions(data);
        }
      })
      .catch((error) => {
        setError(error);
        setInteractions(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  });
  return (
    <section className="content">
      <h1>Interactions Page.</h1>
      <section className="navbarOptions">
        <button className="create">Create interaction</button>
      </section>
      {IsLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="interactions-grid">
        {interactions?.map((interaction) => (
          <InteractionCard key={interaction.id} interaction={interaction} />
        ))}
      </div>
    </section>
  );
}
