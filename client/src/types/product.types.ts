export interface ProductDetails {
  max_amount?: number;
  term_months?: number;
  interest_type?: string;
  requires_guarantee?: boolean;
  deadline?: number;
  max_balance?: number;
  management_fee?: number;
  interest_rate_arrears?: number;
  coverage?: string;
  insured_value?: number;
  deductible?: number;
  min_amount?: number;
  account_type?: string;
  daily_withdrawal_limit?: number;
  allow_overdraft?: boolean;
  checkbook_included?: boolean;
}

export type ProductType = "credito" | "tarjeta" | "seguro" | "cuenta";
export interface Product {
  id?: string;
  name: string;
  product_type: ProductType;
  description: string;
  interest_rate: number;
  status: string;
  created_at?: string;
  details: ProductDetails;
}
