import type { Users, UsersFilters } from "../types/user.types";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getUsers() {
  try {
    const req = await fetch(`${BACKEND_URL}/users`);
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
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: { "Content-Type": "application/json" },
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
      headers: {
        "Content-Type": "application/json",
      },
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
    });
    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}
