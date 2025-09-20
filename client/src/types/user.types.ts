export interface Users {
  _id: string;
  name: string;
  email: string;
  username: string;
  edad: number;
  created_at: string;
}

export interface UsersFilters {
  name?: string;
  username?: string;
}
