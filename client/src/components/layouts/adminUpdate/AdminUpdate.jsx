import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../store/Auth";
import "./AdminUpdate.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminUpdate = () => {
  const [userUpdate, setUserUpdate] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();
  const params = useParams();
  const { authorizationToken } = useAuth();

  // *------------------------------------------- Get single user data
  const getUserById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${params.id}`, //get id from  url parameter
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      const userData = await response.json();
      //console.log("usersData : " + userData);
      setUserUpdate(userData);
    } catch (error) {
      console.log("userData Error" + error);
    }
  };

  useEffect(() => {
    getUserById(); // function call
  }, []);
  // *-------------------------------------------End  Get single user data

  // *-------------------------edit value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUserUpdate({
      ...userUpdate,
      [name]: value,
    });
  };
  // *-------------------------end: edit value

  // ------------------ update button to set updated value
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/update/${params.id}`, //get id from  url parameter
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(userUpdate),
        }
      );

      if (response.ok) {
        toast.success("Updated Successfully", {
          autoClose: 1000,
        });
        navigate("/admin/users");
      } else {
        toast.error("Not Updated Successfully", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ------------------ end: update button to set updated value

  return (
    <div className="updateSection">
      <div>
        <h1 className="heading">Update User Details</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            required
            autoComplete="off"
            value={userUpdate.username}
            onChange={handleInput}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            autoComplete="off"
            value={userUpdate.email}
            onChange={handleInput}
          />
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            name="phone"
            id="phone"
            required
            autoComplete="off"
            value={userUpdate.phone}
            onChange={handleInput}
          />

          <button className="btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default AdminUpdate;
