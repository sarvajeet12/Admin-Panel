import React, { useEffect, useState } from "react";
import { useAuth } from "../../../store/Auth";

const URL = "http://localhost:5000/api/admin/contacts";

const AdminContact = () => {
  const [userContacts, setUserContacts] = useState([]);
  const { authorizationToken } = useAuth();

  // *------------------------------------------- Get all users data-------------------
  const getAllContacts = async () => {
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const userData = await response.json();
      //console.log("usersData : " + userData);
      setUserContacts(userData);
    } catch (error) {
      console.log("userData Error" + error);
    }
  };

  useEffect(() => {
    getAllContacts(); // function call
  }, []);
  // *--------------------------------------------End: Get all users data----------------

  //* -------------------------------------------- delete the user on delete button--------------
  const handleDelete = async (id) => {
    //console.log(id);
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      //console.log(response);

      if (response.ok) {
        getAllContacts();
        // for refresh purpose, if i not write getAllUsers(), then  it will not work properly, then click on refresh button then give correct data
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="adminContactSection">
      <h1>Admin Contacts Data</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {userContacts.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.message}</td>
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

export default AdminContact;
