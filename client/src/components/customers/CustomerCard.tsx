import type { Customer } from "../../types/customer.type";
import {
  UserCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Edit,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface customerCardProps {
  customer: Customer;
}

export default function CustomerCard({ customer }: customerCardProps) {
  const navigate = useNavigate();
  const calculateAge = (birthDate: string): number => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (name: string): string => {
    const names = name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <article className="customer-card">
      <div className="customer-card__accent" />

      <div className="customer-card__content">
        <div className="customer-card__header">
          <div className="customer-card__avatar">
            <span className="customer-card__initials">
              {getInitials(customer.name)}
            </span>
          </div>

          <div className="customer-card__header-info">
            <h3 className="customer-card__name">{customer.name}</h3>
            <div className="customer-card__document">
              <CreditCard className="customer-card__icon-small" />
              <span>
                {customer.document_type} {customer.document_number}
              </span>
            </div>
          </div>
        </div>

        <div className="customer-card__body">
          <div className="customer-card__info-row">
            <Mail className="customer-card__icon" />
            <div className="customer-card__info-content">
              <span className="customer-card__label">Email</span>
              <span className="customer-card__value">{customer.email}</span>
            </div>
          </div>

          <div className="customer-card__info-row">
            <Phone className="customer-card__icon" />
            <div className="customer-card__info-content">
              <span className="customer-card__label">Teléfono</span>
              <span className="customer-card__value">{customer.phone}</span>
            </div>
          </div>

          <div className="customer-card__info-row">
            <MapPin className="customer-card__icon" />
            <div className="customer-card__info-content">
              <span className="customer-card__label">Dirección</span>
              <span className="customer-card__value">{customer.address}</span>
            </div>
          </div>

          <div className="customer-card__info-row">
            <Calendar className="customer-card__icon" />
            <div className="customer-card__info-content">
              <span className="customer-card__label">Edad</span>
              <span className="customer-card__value">
                {calculateAge(customer.birth_date)} años
              </span>
            </div>
          </div>

          <div className="customer-card__info-row">
            <UserCircle className="customer-card__icon" />
            <div className="customer-card__info-content">
              <span className="customer-card__label">Creado por</span>
              <span className="customer-card__value">@{customer.username}</span>
            </div>
          </div>
        </div>

        <div className="customer-card__footer">
          <span className="customer-card__footer-label">Cliente desde</span>
          <span className="customer-card__footer-value">
            {formatDate(customer.created_at)}
          </span>
          <button
            className="customer-card__edit-btn"
            aria-label="Editar"
            title="Editar cliente"
            onClick={() => {
              navigate("/dashboard/customers/edit", { state: { customer } });
            }}
          >
            <Edit className="icon-small" />
          </button>
        </div>
      </div>
    </article>
  );
}
