import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="sidebar">
      <NavLink
        className={({ isActive }) =>
          isActive ? "navItem navItemActive" : "navItem"
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "navItem navItemActive" : "navItem"
        }
        to="/users"
      >
        Customers
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "navItem navItemActive" : "navItem"
        }
        to="/products"
      >
        Products
      </NavLink>
    </nav>
  );
}

export default Nav;
