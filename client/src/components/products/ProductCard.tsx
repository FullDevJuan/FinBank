import { CreditCard, Info, Shield, TrendingUp, Wallet } from "lucide-react";
import { type Product } from "../../types/product.types.ts";

interface ProductCardProps {
  product: Product;
}
export default function ProductCard({ product }: ProductCardProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "credito":
        return <TrendingUp size={20} />;
      case "tarjeta":
        return <CreditCard size={20} />;
      case "seguro":
        return <Shield size={20} />;
      case "cuenta":
        return <Wallet size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={"product-card"}>
      <div className="product-card__accent" />

      <div className="product-card__content">
        {/* Header */}
        <div className="product-card__header">
          <div className="product-card__icon-wrapper">
            {getIcon(product.product_type)}
          </div>
          <span className="product-card__badge">{product.product_type}</span>
        </div>

        {/* Body */}
        <div className="product-card__body">
          <h3 className="product-card__title">{product.name}</h3>
          <p className="product-card__description">{product.description}</p>

          {/* Details Grid */}
          <div className="product-card__details">
            {product.interest_rate !== 0.0 && (
              <div className="detail-box">
                <div className="detail-box__label">Tasa</div>
                <div className="detail-box__value">
                  {product.interest_rate}%
                </div>
              </div>
            )}

            {product.details.max_amount && (
              <div className="detail-box">
                <div className="detail-box__label">Máximo</div>
                <div className="detail-box__value detail-box__value--small">
                  {formatAmount(product.details.max_amount)}
                </div>
              </div>
            )}

            {product.details.term_months && (
              <div className="detail-box">
                <div className="detail-box__label">Plazo</div>
                <div className="detail-box__value">
                  {product.details.term_months} meses
                </div>
              </div>
            )}

            {product.details.insured_value && (
              <div className="detail-box">
                <div className="detail-box__label">Asegurado</div>
                <div className="detail-box__value detail-box__value--small">
                  {formatAmount(product.details.insured_value)}
                </div>
              </div>
            )}

            {product.details.max_balance && (
              <div className="detail-box">
                <div className="detail-box__label">Cupo</div>
                <div className="detail-box__value detail-box__value--small">
                  {formatAmount(product.details.max_balance)}
                </div>
              </div>
            )}

            {product.details.min_amount && (
              <div className="detail-box">
                <div className="detail-box__label">Mínimo</div>
                <div className="detail-box__value detail-box__value--small">
                  {formatAmount(product.details.min_amount)}
                </div>
              </div>
            )}

            {product.details.management_fee !== undefined &&
              product.details.management_fee > 0 && (
                <div className="detail-box">
                  <div className="detail-box__label">Cuota</div>
                  <div className="detail-box__value detail-box__value--small">
                    {formatAmount(product.details.management_fee)}
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Footer */}
        <div className="product-card__footer">
          <span className="product-card__info">
            {product.details.interest_type && product.details.interest_type}
            {product.details.account_type && product.details.account_type}
            {product.details.coverage && "Protección completa"}
          </span>
          <button
            className="product-card__action"
            aria-label="Más información"
            title="Más información"
          >
            <Info className="icon-small" />
          </button>
        </div>
      </div>
    </div>
  );
}
