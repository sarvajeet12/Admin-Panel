import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/Auth";

const Navbar = () => {
  let { isLoggedIn } = useAuth();

  return (
    <div className="navbar container">
      <div>
        <h1>MERN</h1>
      </div>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/about"}>About</Link>
        </li>
        <li>
          <Link to={"/contact"}>Contact</Link>
        </li>
        <li>
          <Link to={"/service"}>Service</Link>
        </li>
        {isLoggedIn ? (
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        ) : (
          <>
            <li>
              <Link to={"/register"}>SignUp</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
