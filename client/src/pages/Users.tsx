import { useEffect, useState } from "react";
import Button from "../components/common/Button.tsx";
import CreateUser from "../components/users/CreateUser.tsx";
import { type Users } from "../types/user.types.ts";
import UpdateUser from "../components/users/UpdateUser.tsx";
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
          className="createUser"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="15"
                    d="M384 224v184a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V168a40 40 0 0 1 40-40h167.48M336 64h112v112M224 288L440 72"
                  />
                </svg>
              </button>
              <h2>
                <span className="userIcon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M21 22c0-4.418-3.626-8-8.1-8h-1.8C6.626 14 3 17.582 3 22m9-11a4 4 0 0 1-4-4V6a4 4 0 1 1 8 0v1a4 4 0 0 1-4 4"
                    />
                  </svg>
                </span>
                {user.name}
              </h2>
              <span className="username">@{user.username}</span>
            </header>
            <div>
              <p style={{ display: "flex", gap: "5px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m5 7.06l6.87 5.89c.07.06.19.06.26 0L19 7.06M3.2 4h17.6c.66 0 1.2.54 1.2 1.2v12.4c0 1.32-1.08 2.4-2.4 2.4H4.4C3.08 20 2 18.92 2 17.6V5.2C2 4.54 2.54 4 3.2 4"
                  />
                </svg>
                {user.email}
              </p>
              <p style={{ display: "flex", gap: "2px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.1"
                  >
                    <path d="M18.709 3.495C16.817 2.554 14.5 2 12 2s-4.816.554-6.709 1.495c-.928.462-1.392.693-1.841 1.419S3 6.343 3 7.748v3.49c0 5.683 4.542 8.843 7.173 10.196c.734.377 1.1.566 1.827.566s1.093-.189 1.827-.566C16.457 20.08 21 16.92 21 11.237V7.748c0-1.405 0-2.108-.45-2.834s-.913-.957-1.841-1.419" />
                    <path d="M12 9v1m-1-.5a1 1 0 1 0 2 0a1 1 0 0 0-2 0" />
                    <path d="M12.75 14h-1.5l.75-3.5z" />
                  </g>
                </svg>
                {user.rol}
              </p>
              <span className="date">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="currentColor"
                    d="M7.5 29A4.5 4.5 0 0 1 3 24.5v-17A4.5 4.5 0 0 1 7.5 3h13.843q.06 0 .118.002a.5.5 0 0 1 .118.004a4.5 4.5 0 0 1 2.946 1.312l3.157 3.157A4.5 4.5 0 0 1 29 10.657V24.5a4.5 4.5 0 0 1-4.5 4.5zm0-25A3.5 3.5 0 0 0 4 7.5v17a3.5 3.5 0 0 0 3 3.465V18.5A2.5 2.5 0 0 1 9.5 16h13a2.5 2.5 0 0 1 2.5 2.5v9.465a3.5 3.5 0 0 0 3-3.465V10.657a3.5 3.5 0 0 0-1.025-2.475l-3.157-3.157A3.5 3.5 0 0 0 22 4.062V9.5a2.5 2.5 0 0 1-2.5 2.5h-8A2.5 2.5 0 0 1 9 9.5V4zM24 28v-9.5a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 8 18.5V28zM21 4H10v5.5a1.5 1.5 0 0 0 1.5 1.5h8A1.5 1.5 0 0 0 21 9.5z"
                  />
                </svg>
                {new Date(user.created_at).toLocaleDateString("es-Es", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              {/* {false && (
                <button
                  className="btn-delete"
                  onClick={() => {
                    deleteUser(user.id).then((res) => {
                      alert(
                        `${
                          res.error
                            ? `${res.msg}. Error: ${res.error}`
                            : `${res.msg}`
                        }`
                      );
                      getAll();
                    });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="currentColor"
                      d="M14 12.5a.5.5 0 0 0-1 0v11a.5.5 0 0 0 1 0zm4.5-.5a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5m2-5.5V7h8a.5.5 0 0 1 0 1h-2.543l-1.628 17.907A4.5 4.5 0 0 1 19.847 30h-7.694a4.5 4.5 0 0 1-4.482-4.093L6.043 8H3.5a.5.5 0 0 1 0-1h8v-.5a4.5 4.5 0 1 1 9 0m-8 0V7h7v-.5a3.5 3.5 0 1 0-7 0M7.048 8l1.62 17.817A3.5 3.5 0 0 0 12.152 29h7.694a3.5 3.5 0 0 0 3.486-3.183L24.953 8z"
                    />
                  </svg>
                </button>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
