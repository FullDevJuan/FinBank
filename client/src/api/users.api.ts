import type { Users, UsersFilters, UsersLogin } from "../types/user.types";
import getAuthHeaders from "../utils/getAuthHeaders";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getUsers() {
  try {
    const req = await fetch(`${BACKEND_URL}/users`, {
      headers: getAuthHeaders(),
    });
    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
    return { msg: "Error al cargar los usuarios. Intente más tarde." };
  }
}

export async function getUsersByFilters(data: UsersFilters) {
  try {
    const options = {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    };
    const req = await fetch(`${BACKEND_URL}/users/filters`, options);
    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function saveUser(body: Users) {
  try {
    const options = {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    };
    const req = await fetch(`${BACKEND_URL}/users/create`, options);
    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(body: Users) {
  try {
    const options = {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    };
    const req = await fetch(`${BACKEND_URL}/users/update/${body.id}`, options);
    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(id: string) {
  try {
    const req = await fetch(`${BACKEND_URL}/users/delete/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function loginUser(data: UsersLogin) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(`${BACKEND_URL}/auth/login`, options);
    const result = await response.json();
    if (response.ok) {
      sessionStorage.setItem("token", result.token);
      sessionStorage.setItem("user", JSON.stringify(result.user));
      return { success: true, data: result };
    } else {
      return { success: false, error: result.msg };
    }
  } catch (error) {
    console.log(error);
    return { success: false, error: "Error en el servidor" };
  }
}

export function logoutUser() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");

  // redirigin usuario al login
  window.location.href = "/";
}
