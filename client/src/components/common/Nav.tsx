import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { logoutUser } from "../../api/users.api";
import {
  Home,
  IdCard,
  NotebookPen,
  Users,
  BookUser,
  CircleDollarSign,
  // SquareChartGantt,
  SquareUser,
  HandCoins,
  LogOut,
} from "lucide-react";

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
        <Home size={20} />
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "navItem navItemActive" : "navItem"
        }
        to="/dashboard/products"
      >
        <HandCoins size={20} />
        Products
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive ? "navItem navItemActive" : "navItem"
        }
        to="/dashboard/accounts"
      >
        <IdCard size={20} />
        Accounts
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "navItem navItemActive" : "navItem"
        }
        to="/dashboard/customers"
      >
        <BookUser size={20} />
        Customers
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "navItem navItemActive" : "navItem"
        }
        to="/dashboard/transactions"
      >
        <CircleDollarSign size={20} />
        Transactions
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "navItem navItemActive" : "navItem"
        }
        to="/dashboard/interactions"
      >
        <NotebookPen size={20} />
        Interactions
      </NavLink>
      {isAdmin && (
        <NavLink
          className={({ isActive }) =>
            isActive ? "navItem navItemActive" : "navItem"
          }
          to="/dashboard/users"
        >
          <Users size={20} />
          Users
        </NavLink>
      )}

      {/* {isAdmin && (
        <NavLink
          className={({ isActive }) =>
            isActive ? "navItem navItemActive" : "navItem"
          }
          to="/dashboard/audit"
        >
          <SquareChartGantt size={20} />
          Audit
        </NavLink>
      )} */}

      <section className="userProfile">
        <div>
          <SquareUser size={26} strokeWidth={1} />
        </div>
        <div className="userProfileInfo">
          <p>{user?.name || "Loading..."}</p>
          <p>{user?.email || "Loading..."}</p>
        </div>
        <button title="Logout" onClick={logoutUser}>
          <LogOut size={20} />
        </button>
      </section>
    </nav>
  );
}

export default Nav;
