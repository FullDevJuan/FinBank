import type { Users, UsersFilters } from "../types/user.types";

export async function getUsers() {
  try {
    const req = await fetch("http://localhost:8000/api/users");
    const data = await req.json();
    return data;
  } catch (error: any) {
    console.log(error);
    return "Error to load users, try later.";
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
    const req = await fetch("http://localhost:8000/api/users/filter", options);
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
    const req = await fetch("http://localhost:8000/api/users/create", options);
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
    const req = await fetch(
      `http://localhost:8000/api/users/update/${body._id}`,
      options
    );
    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(id: string) {
  try {
    const req = await fetch(`http://localhost:8000/api/users/delete/${id}`, {
      method: "DELETE",
    });
    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}
