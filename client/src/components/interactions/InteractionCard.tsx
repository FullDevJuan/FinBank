import { useNavigate } from "react-router-dom";
import { type Interaction } from "../../types/interaction.type";
import {
  Phone,
  Mail,
  Users,
  MessageSquare,
  User,
  UserCircle,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

interface InteractionCardProps {
  interaction: Interaction;
}

export default function InteractionCard({ interaction }: InteractionCardProps) {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/dashboard/interactions/edit", { state: { interaction } });
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getInteractionIcon = () => {
    switch (interaction.interaction_type) {
      case "llamada":
        return <Phone className="interaction-card__type-icon" />;
      case "correo":
        return <Mail className="interaction-card__type-icon" />;
      case "reunion":
        return <Users className="interaction-card__type-icon" />;
      case "chat":
        return <MessageSquare className="interaction-card__type-icon" />;
      default:
        return <MessageSquare className="interaction-card__type-icon" />;
    }
  };

  const getInteractionLabel = (): string => {
    switch (interaction.interaction_type) {
      case "llamada":
        return "Llamada";
      case "correo":
        return "Correo";
      case "reunion":
        return "Reunión";
      case "chat":
        return "Chat";
      default:
        return "Interacción";
    }
  };

  const getInteractionTypeClass = (): string => {
    switch (interaction.interaction_type) {
      case "llamada":
        return "interaction-card__type--call";
      case "correo":
        return "interaction-card__type--email";
      case "reunion":
        return "interaction-card__type--meeting";
      case "chat":
        return "interaction-card__type--chat";
      default:
        return "";
    }
  };

  const getOutcomeIcon = () => {
    switch (interaction.outcome) {
      case "exitoso":
        return <CheckCircle className="interaction-card__outcome-icon" />;
      case "pendiente":
        return <Clock className="interaction-card__outcome-icon" />;
      case "fallido":
        return <XCircle className="interaction-card__outcome-icon" />;
      default:
        return <Clock className="interaction-card__outcome-icon" />;
    }
  };

  const getOutcomeLabel = (): string => {
    switch (interaction.outcome) {
      case "exitoso":
        return "Exitoso";
      case "pendiente":
        return "Pendiente";
      case "fallido":
        return "Fallido";
      default:
        return "Pendiente";
    }
  };

  const getOutcomeClass = (): string => {
    switch (interaction.outcome) {
      case "exitoso":
        return "interaction-card__outcome--success";
      case "pendiente":
        return "interaction-card__outcome--pending";
      case "fallido":
        return "interaction-card__outcome--failed";
      default:
        return "";
    }
  };

  return (
    <article
      className="interaction-card"
      onClick={handleEditClick}
      style={{ cursor: "pointer" }}
    >
      <div className="interaction-card__accent" />

      <div className="interaction-card__content">
        <div className="interaction-card__header">
          <div
            className={`interaction-card__type ${getInteractionTypeClass()}`}
          >
            {getInteractionIcon()}
            <span className="interaction-card__type-label">
              {getInteractionLabel()}
            </span>
          </div>
          <div className={`interaction-card__outcome ${getOutcomeClass()}`}>
            {getOutcomeIcon()}
            <span className="interaction-card__outcome-label">
              {getOutcomeLabel()}
            </span>
          </div>
        </div>

        <div className="interaction-card__body">
          <h3 className="interaction-card__subject">{interaction.subject}</h3>
          <p className="interaction-card__description">
            {interaction.description}
          </p>
        </div>

        <div className="interaction-card__footer">
          <div className="interaction-card__info-group">
            <User className="interaction-card__footer-icon" />
            <div className="interaction-card__info-content">
              <span className="interaction-card__info-label">Cliente</span>
              <span className="interaction-card__info-value">
                {interaction.customer}
              </span>
            </div>
          </div>

          <div className="interaction-card__info-group">
            <UserCircle className="interaction-card__footer-icon" />
            <div className="interaction-card__info-content">
              <span className="interaction-card__info-label">Agente</span>
              <span className="interaction-card__info-value">
                @{interaction.user}
              </span>
            </div>
          </div>

          <div className="interaction-card__info-group">
            <Calendar className="interaction-card__footer-icon" />
            <div className="interaction-card__info-content">
              <span className="interaction-card__info-label">Fecha</span>
              <span className="interaction-card__info-value">
                {formatDate(interaction.date)} · {formatTime(interaction.date)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
