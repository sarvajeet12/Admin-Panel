import React, { useState } from "react";
import "./SignUp.css";
import signUpImage from "../../assets/signUpImage.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../store/Auth";

const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const { storeTokenInLS } = useAuth();

  //* handle the input value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // dynamically
    setUser({
      ...user,
      [name]: value,
      // username: value
    });
  };

  // * handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(user);

    // get data from backend
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const respData = await response.json();
      if (response.ok) {
        //console.log("response Data ", respData);

        // function call
        storeTokenInLS(respData.token);

        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });

        // notification
        toast.success("SingUp Successfully", {
          autoClose: 1000, // auto close in 3sec
        });

        navigate("/");
      } else {
        // validation in alert box
        toast.error(
          respData.extraDetails ? respData.extraDetails : respData.message,
          {
            autoClose: 3000, // auto close in 3sec
          }
        );
      }
      console.log(response);
    } catch (error) {
      console.log("Error in Submission ", error);
    }
  };

  return (
    <div className="singUpSection grid gridTwoTemplate">
      <div>
        <img src={signUpImage} className="img" />
      </div>
      <div>
        <h1 className="heading">Registration Form</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            required
            autoComplete="off"
            value={user.username}
            onChange={handleInput}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            autoComplete="off"
            value={user.email}
            onChange={handleInput}
          />
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            name="phone"
            id="phone"
            required
            autoComplete="off"
            value={user.phone}
            onChange={handleInput}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            autoComplete="off"
            value={user.password}
            onChange={handleInput}
          />

          <button className="btn">Register Now</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
