export type DocumentType = "CC" | "CE" | "TI" | "PAS";

export interface Customer {
  id: string;
  name: string;
  document_type: DocumentType;
  document_number: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
  birth_date: string;
  username: string;
}
