import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { logoutUser } from "../../api/users.api";

type UserType = {
  name: string;
  email: string;
  rol: string;
};

function Nav() {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const userStr = sessionStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const isAdmin = user?.rol === "Admin";
  return (
    <nav className="sidebar">
      <section className="logo">
        <img src="/finbank.png" alt="logo" />
        <h1>Finbank</h1>
      </section>

      <NavLink
        className={({ isActive }) =>
          isActive ? "navItem navItemActive" : "navItem"
        }
        to="/dashboard"
        end
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19.505 17.943v-7.581a1.49 1.49 0 0 0 1.39-1.12a1.47 1.47 0 0 0-.7-1.68l-7.45-4.3a1.52 1.52 0 0 0-1.49 0l-7.45 4.3a1.47 1.47 0 0 0-.7 1.68a1.49 1.49 0 0 0 1.45 1.12h.13v7.57h-.12a1.5 1.5 0 0 0 0 3h14.87a1.5 1.5 0 0 0 .07-2.989M4.555 9.362a.505.505 0 0 1-.25-.94l7.45-4.289a.47.47 0 0 1 .49 0L19.7 8.422a.5.5 0 0 1-.25.94Zm13.95 1v7.57H14.9v-7.57Zm-4.61 0v7.57h-3.61v-7.57Zm-4.61 0v7.57h-3.6v-7.57Zm10.15 9.57H4.565a.5.5 0 0 1-.5-.5a.5.5 0 0 1 .5-.5h14.87a.5.5 0 0 1 .5.5a.5.5 0 0 1-.5.5"
            strokeWidth="0.5"
            stroke="currentColor"
          />
        </svg>
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "navItem navItemActive" : "navItem"
        }
        to="/dashboard/products"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 2048 2048"
        >
          <path
            fill="currentColor"
            d="m1344 2l704 352v785l-128-64V497l-512 256v258l-128 64V753L768 497v227l-128-64V354zm0 640l177-89l-463-265l-211 106zm315-157l182-91l-497-249l-149 75zm-507 654l-128 64v-1l-384 192v455l384-193v144l-448 224L0 1735v-676l576-288l576 288zm-640 710v-455l-384-192v454zm64-566l369-184l-369-185l-369 185zm576-1l448-224l448 224v527l-448 224l-448-224zm384 576v-305l-256-128v305zm384-128v-305l-256 128v305zm-320-288l241-121l-241-120l-241 120z"
          />
        </svg>
        Products
      </NavLink>
      {isAdmin && (
        <NavLink
          className={({ isActive }) =>
            isActive ? "navItem navItemActive" : "navItem"
          }
          to="/dashboard/users"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M14 12.25a3.75 3.75 0 1 1 3.75-3.75A3.75 3.75 0 0 1 14 12.25m0-6a2.25 2.25 0 1 0 2.25 2.25A2.25 2.25 0 0 0 14 6.25m7 13a.76.76 0 0 1-.75-.75c0-1.95-1.06-3.25-6.25-3.25s-6.25 1.3-6.25 3.25a.75.75 0 0 1-1.5 0c0-4.75 5.43-4.75 7.75-4.75s7.75 0 7.75 4.75a.76.76 0 0 1-.75.75M8.32 13.06H8a3 3 0 1 1 .58-6a.75.75 0 1 1-.15 1.49a1.46 1.46 0 0 0-1.09.34a1.47 1.47 0 0 0-.54 1a1.49 1.49 0 0 0 1.35 1.64a1.53 1.53 0 0 0 .93-.22a.75.75 0 0 1 .79 1.28a3 3 0 0 1-1.55.47M3 18.5a.76.76 0 0 1-.75-.75c0-2.7.72-4.5 4.25-4.5a.75.75 0 0 1 0 1.5c-2.35 0-2.75.75-2.75 3a.76.76 0 0 1-.75.75"
              strokeWidth="0.5"
              stroke="currentColor"
            />
          </svg>
          Users
        </NavLink>
      )}
      <NavLink
        className={({ isActive }) =>
          isActive ? "navItem navItemActive" : "navItem"
        }
        to="/dashboard/accounts"
      >
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 1024 1024"
          fill="currentColor"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          strokeWidth="15.36"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M110.4 923.2c-56.8 0-102.4-48-102.4-106.4V285.6c0-58.4 45.6-106.4 102.4-106.4h800.8c56.8 0 102.4 48 102.4 106.4V816c0 58.4-45.6 106.4-102.4 106.4H110.4z m0-701.6c-34.4 0-61.6 28.8-61.6 64V816c0 35.2 28 64 61.6 64h800.8c34.4 0 61.6-28.8 61.6-64V285.6c0-35.2-28-64-61.6-64H110.4z"
              fill=""
            ></path>
            <path
              d="M541.6 392c-12.8 0-23.2-10.4-23.2-24s10.4-24 23.2-24h328c12.8 0 23.2 10.4 23.2 24s-10.4 24-23.2 24h-328zM541.6 511.2c-12.8 0-23.2-10.4-23.2-24s10.4-24 23.2-24h328c12.8 0 23.2 10.4 23.2 24s-10.4 24-23.2 24h-328zM541.6 638.4c-12.8 0-23.2-10.4-23.2-24s10.4-24 23.2-24h276.8c12.8 0 23.2 10.4 23.2 24s-10.4 24-23.2 24H541.6zM58.4 886.4c-2.4 0-4.8 0-7.2-0.8-12.8-4-20-18.4-16-32 23.2-78.4 77.6-142.4 148-176l16-8-13.6-12c-40-34.4-63.2-85.6-63.2-139.2 0-100 78.4-180.8 173.6-180.8 96 0 173.6 80.8 173.6 180.8 0 53.6-23.2 104.8-63.2 139.2l-13.6 12 16 8c68 32 132.8 112 157.6 194.4 16 52.8-16.8 36-1.6 16-3.2 4.8-16.8-5.6-32-5.6-12.8 0-19.2 24.8-19.2 22.4-31.2-104-120.8-203.2-217.6-203.2-99.2 0-186.4 67.2-216 166.4-1.6 11.2-11.2 18.4-21.6 18.4z m239.2-498.4c-69.6 0-126.4 58.4-126.4 130.4s56.8 130.4 126.4 130.4c69.6 0 126.4-58.4 126.4-130.4-0.8-72-56.8-130.4-126.4-130.4z"
              fill=""
            ></path>
          </g>
        </svg>
        Accounts
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "navItem navItemActive" : "navItem"
        }
        to="/dashboard/customers"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M29.755 21.345A1 1 0 0 0 29 21h-2v-2c0-1.102-.897-2-2-2h-4c-1.103 0-2 .898-2 2v2h-2a1.001 1.001 0 0 0-.99 1.142l1 7A1 1 0 0 0 18 30h10a1 1 0 0 0 .99-.858l1-7a1.001 1.001 0 0 0-.235-.797M21 19h4v2h-4zm6.133 9h-8.266l-.714-5h9.694zM10 20h2v10h-2z"
          />
          <path
            fill="currentColor"
            d="m16.78 17.875l-1.906-2.384l-1.442-3.605A2.986 2.986 0 0 0 10.646 10H5c-1.654 0-3 1.346-3 3v7c0 1.103.897 2 2 2h1v8h2V20H4v-7a1 1 0 0 1 1-1h5.646c.411 0 .776.247.928.629l1.645 3.996l2 2.5zM4 5c0-2.206 1.794-4 4-4s4 1.794 4 4s-1.794 4-4 4s-4-1.794-4-4m2 0c0 1.103.897 2 2 2s2-.897 2-2s-.897-2-2-2s-2 .897-2 2"
          />
        </svg>
        Customers
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "navItem navItemActive" : "navItem"
        }
        to="/dashboard/transactions"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          >
            <path d="M16.977 19.5A9 9 0 0 0 10 3.223M16.977 19.5V16m0 3.5H20.5M7 4.516a9 9 0 0 0 7 16.261M7 4.516V8m0-3.484H3.5" />
            <path d="M10.438 14.667V9.333m1.562 0V8m0 8v-1.333M10.438 12h3.124m0 0c.518 0 .938.448.938 1v.667c0 .552-.42 1-.937 1H9.5M13.563 12c.517 0 .937-.448.937-1v-.667c0-.552-.42-1-.937-1H9.5" />
          </g>
        </svg>
        Transactions
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "navItem navItemActive" : "navItem"
        }
        to="/dashboard/interactions"
      >
        <svg
          width="24px"
          height="24px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M7 7h3v3h12V7h3v8h2V7c0-1.1-.9-2-2-2h-3V4c0-1.1-.9-2-2-2h-8c-1.1 0-2 .9-2 2v1H7c-1.1 0-2 .9-2 2v21c0 1.1.9 2 2 2h4v-2H7zm5-3h8v4h-8zm12.414 14L23 19.414L25.586 22H18c-2.206 0-4 1.794-4 4s1.794 4 4 4h2v-2h-2c-1.102 0-2-.897-2-2s.898-2 2-2h7.586L23 26.586L24.414 28l5-5z"
          />
        </svg>
        Interactions
      </NavLink>

      {isAdmin && (
        <NavLink
          className={({ isActive }) =>
            isActive ? "navItem navItemActive" : "navItem"
          }
          to="/dashboard/audit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
            >
              <path
                strokeLinejoin="round"
                d="M19 11v-1c0-3.771 0-5.657-1.172-6.828S14.771 2 11 2S5.343 2 4.172 3.172S3 6.229 3 10v4c0 3.771 0 5.657 1.172 6.828S7.229 22 11 22"
              />
              <path d="m21 22l-1.714-1.714m.571-2.857a3.429 3.429 0 1 1-6.857 0a3.429 3.429 0 0 1 6.857 0Z" />
              <path strokeLinejoin="round" d="M7 7h8m-8 4h4" />
            </g>
          </svg>
          Audit
        </NavLink>
      )}

      <section className="userProfile">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28px"
            height="28px"
            viewBox="0 0 24 24"
          >
            <g fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M17.933 21.257c-.216-1.2-.948-2.293-2.06-3.076c-1.111-.783-2.527-1.202-3.982-1.18s-2.852.484-3.929 1.3s-1.76 1.932-1.924 3.137" />
              <circle cx="12" cy="10" r="3" strokeLinecap="round" />
              <rect width="19" height="19" x="2.5" y="2.5" rx="3.5" />
            </g>
          </svg>
        </div>
        <div className="userProfileInfo">
          <p>{user?.name || "Loading..."}</p>
          <p>{user?.email || "Loading..."}</p>
        </div>
        <button title="Logout" onClick={logoutUser}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4.393 4C4 4.617 4 5.413 4 7.004v9.994c0 1.591 0 2.387.393 3.002q.105.165.235.312c.483.546 1.249.765 2.78 1.202c1.533.438 2.3.657 2.856.329a1.5 1.5 0 0 0 .267-.202C11 21.196 11 20.4 11 18.803V5.197c0-1.596 0-2.393-.469-2.837a1.5 1.5 0 0 0-.267-.202c-.555-.328-1.323-.11-2.857.329c-1.53.437-2.296.656-2.78 1.202a2.5 2.5 0 0 0-.234.312M11 4h2.017c1.902 0 2.853 0 3.443.586c.33.326.476.764.54 1.414m-6 14h2.017c1.902 0 2.853 0 3.443-.586c.33-.326.476-.764.54-1.414m4-6h-7m5.5-2.5S22 11.34 22 12s-2.5 2.5-2.5 2.5"
            />
          </svg>
        </button>
      </section>
    </nav>
  );
}

export default Nav;
