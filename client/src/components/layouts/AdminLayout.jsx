import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import "./AdminLayout.css";
import { useAuth } from "../../store/Auth";

const AdminLayout = () => {
  const { user, isLoading } = useAuth();
  console.log("user : ", user);

  //if not loggedIn
  if (user == null) {
    return <Navigate to="/" />;
  }

  // to solve [!user.isAdmin ] issue, we do isLoading concept
  if (isLoading) {
    //if true
    return <h1>Loading...</h1>;
  }

  // if loggedIn but not admin
  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  // else part
  return (
    <div className="adminLayoutContainer">
      <nav>
        <ul>
          <li>
            <Link to={"/admin/users"}>Users</Link>
          </li>
          <li>
            <Link to={"/admin/contacts"}>Contacts</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default AdminLayout;
