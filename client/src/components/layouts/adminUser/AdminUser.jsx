import React, { useEffect, useState } from "react";
import { useAuth } from "../../../store/Auth";
import { Link } from "react-router-dom";

const URL = "http://localhost:5000/api/admin/users";

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();

  console.log("users data : ", users);
  // *------------------------------------------- Get all users data
  const getAllUsers = async () => {
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      console.log("response: ", response);
      const userData = await response.json();
      console.log("usersData : " + userData);
      setUsers(userData);
    } catch (error) {
      console.log("userData Error" + error);
    }
  };

  useEffect(() => {
    getAllUsers(); // function call
  }, []);

  //* -------------------------------------------- delete the user on delete button
  const handleDelete = async (id) => {
    //console.log(id);
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      //console.log(response);

      if (response.ok) {
        getAllUsers();
        // for refresh purpose, if i not write getAllUsers(), then  it will not work properly, then click on refresh button then give correct data
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="adminUserSection">
      <h1>Admin Users Data</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <Link to={`/admin/users/${item._id}/edit`}>Edit</Link>
                </td>
                <td>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUser;
