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

export interface UsersLogin {
  email: string;
  pass: string;
}

export interface Login {
  onSubmit: (data: UsersLogin) => void;
}
