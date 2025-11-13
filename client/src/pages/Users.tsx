import { useEffect, useState } from "react";
import Button from "../components/common/Button.tsx";
import CreateUser from "../components/users/CreateUser.tsx";
import { type Users } from "../types/user.types.ts";
import UpdateUser from "../components/users/UpdateUser.tsx";
import { Save, ExternalLink, Mail, Shield, User } from "lucide-react";
import {
  // deleteUser,
  getUsersByFilters,
  getUsers,
  saveUser,
  updateUser,
} from "../api/users.api.ts";

type Form = {
  type: string;
  user?: Users;
};

export default function Users() {
  const [users, setUsers] = useState<Users[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [form, setForm] = useState<Form | null>(null);
  const [filters, setFilters] = useState({ name: "", username: "" });

  const getAll = () => {
    getUsers()
      .then((data) => {
        if (data.msg) {
          setError(data.msg);
          setUsers(null);
        } else {
          setError("");
          setUsers(data);
        }
      })
      .catch((error) => {
        setError(error);
        setUsers(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAll();
  }, []);
  return (
    <section className="content">
      {form?.type === "create" && (
        <CreateUser
          onSubmit={(data: Users) => {
            saveUser(data).then((res) => {
              alert(
                `${res.error ? `${res.msg}. Error: ${res.error}` : res.msg}`
              );
              setForm(null);
              getAll();
            });
          }}
          closeModal={() => {
            setForm(null);
          }}
        />
      )}
      {form?.type === "update" && form.user && (
        <UpdateUser
          onSubmit={(data: Users) => {
            updateUser(data).then((res) => {
              alert(
                `${res.error ? `${res.msg}. Error: ${res.error}` : res.msg}`
              );
              setForm(null);
              getAll();
            });
          }}
          closeModal={() => {
            setForm(null);
          }}
          user={form.user}
        />
      )}

      <h1>Welcome to users.</h1>
      <section className="navbarOptions">
        <Button
          onClickBtn={() => {
            setForm({ type: "create" });
          }}
          className="create"
        >
          Create user
        </Button>
        <div style={{ display: "none" }} className="filters">
          <h2>Filter by</h2>
          <div>
            <input
              type="text"
              placeholder="name"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="username"
              value={filters.username}
              onChange={(e) =>
                setFilters({ ...filters, username: e.target.value })
              }
            />
            <button
              disabled={Object.values(filters).join("") === ""}
              className="apply-filters"
              onClick={() => {
                const cleanFilters = Object.fromEntries(
                  Object.entries(filters).filter(([, v]) => v !== "")
                );
                getUsersByFilters(cleanFilters).then((res) =>
                  res.msg
                    ? (setError(res.msg), setUsers(null))
                    : (setError(""), setUsers(res))
                );
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 48 48"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M31.5 27.604V16.5H20.396m11.104 0l-15 15"
                  strokeWidth="3"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="21.5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                />
              </svg>
            </button>
            <button
              className="refresh-filters"
              onClick={() => {
                getAll();
                setFilters({ name: "", username: "" });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12.077 19q-2.931 0-4.966-2.033q-2.034-2.034-2.034-4.964t2.034-4.966T12.077 5q1.783 0 3.339.847q1.555.847 2.507 2.365V5.5q0-.213.144-.356T18.424 5t.356.144t.143.356v3.923q0 .343-.232.576t-.576.232h-3.923q-.212 0-.356-.144t-.144-.357t.144-.356t.356-.143h3.2q-.78-1.496-2.197-2.364Q13.78 6 12.077 6q-2.5 0-4.25 1.75T6.077 12t1.75 4.25t4.25 1.75q1.787 0 3.271-.968q1.485-.969 2.202-2.573q.085-.196.274-.275q.19-.08.388-.013q.211.067.28.275t-.015.404q-.833 1.885-2.56 3.017T12.077 19"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
      <div className="mainContent">
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {users?.map((user) => (
          <div key={user.id} className="userCard">
            <header>
              <button
                onClick={() => {
                  setForm({ type: "update", user });
                }}
                className="btn-extend"
              >
                <ExternalLink size={20} />
              </button>
              <h2>
                <span className="userIcon">
                  <User size={22} />
                </span>
                {user.name}
              </h2>
              <span className="username">@ {user.username}</span>
            </header>
            <div>
              <p style={{ display: "flex", gap: "5px" }}>
                <Mail size={18} />
                {user.email}
              </p>
              <p style={{ display: "flex", gap: "2px" }}>
                <Shield size={18} />
                {user.rol}
              </p>
              <span className="date">
                <Save size={18} />
                {new Date(user.created_at).toLocaleDateString("es-Es", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
