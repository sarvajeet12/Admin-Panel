import React, { useState } from "react";
import "./Contact.css";
import contactImage from "../../assets/contactImage.jpg";
import { toast } from "react-toastify";
import { useAuth } from "../../store/Auth";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:5000/api/form/contact";

const Contact = () => {
  const [userContact, setUserContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const navigate = useNavigate();

  const [userContactData, setUserContactData] = useState(true);

  const { user } = useAuth();

  if (userContactData && user) {
    setUserContact({
      username: user.username,
      email: user.email,
      message: "",
    });

    setUserContactData(false);
  }

  //* handle the input value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // dynamically
    setUserContact({
      ...userContact, // add previous value
      [name]: value,
      // it means : get name and value => username: value
    });
  };

  // * handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userContact);

    // ========================= connecting fronted with backend and storing data in database

    try {
      //----------------------------------------------------------------------------------------------------
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userContact),
        // Since user is object so we convert it into JSON format  using JSON.stringfy()
      });
      //----------------------------------------------------------------------------------------------

      //* if response.ok = true;
      if (response.ok) {
        // clear the value form input after submitting
        setUserContact({
          username: "",
          email: "",
          message: "",
        });

        // toast notification
        toast.success("Your message has been submitted successfully", {
          autoClose: 3000, // auto close in 3sec
        });

        // navigate
        navigate("/");
      }

      console.log(response);
    } catch (error) {
      console.log("Contact", error);
      // alert("Contact", error);
    }

    // ========================End : connecting fronted with backend
  };

  return (
    <div className="contactSection grid gridTwoTemplate">
      <div>
        <img src={contactImage} className="img" />
      </div>
      <div>
        <h1 className="heading">Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            required
            autoComplete="off"
            value={userContact.username}
            onChange={handleInput}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            autoComplete="off"
            value={userContact.email}
            onChange={handleInput}
          />
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            value={userContact.message}
            onChange={handleInput}
          ></textarea>
          <button className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
