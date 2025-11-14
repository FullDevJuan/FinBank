export type InteractionType = "llamada" | "correo" | "reunion" | "chat";
export type InteractionOutcome = "exitoso" | "pendiente" | "fallido";

export interface Interaction {
  id: string;
  customer_id?: string;
  customer: string;
  user: string;
  interaction_type: InteractionType;
  subject: string;
  description: string;
  outcome: InteractionOutcome;
  date: string;
}
