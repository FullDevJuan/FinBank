export interface Users {
  id: string;
  name: string;
  email: string;
  username: string;
  edad: number;
  rol: string;
  pass: string;
  created_at: string;
}

export interface UsersFilters {
  name?: string;
  username?: string;
}
