import React, { useState } from "react";
import "./Login.css";
import loginImage from "../../assets/loginImage.jpg";
import { useAuth } from "../../store/Auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { storeTokenInLS } = useAuth();

  //* handle the input value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // dynamically
    setUserLogin({
      ...userLogin, // add previous value
      [name]: value,
      // it means : get name and value => username: value
    });
  };

  //*======================================== handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(userLogin);

    // get data form backend
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      });
      //console.log("login form", response);

      const respData = await response.json();
      console.log("response Data ", respData);

      if (response.ok) {
        // function call
        storeTokenInLS(respData.token);

        setUserLogin({
          email: "",
          password: "",
        });

        // toast success
        toast.success("Login Successfully", {
          autoClose: 1000,
        });

        navigate("/");
      } else {
        // toast error notification
        toast.error(
          respData.extraDetails ? respData.extraDetails : respData.message
        );
      }
    } catch (error) {
      console.log("Error in login ", error);
      alert("Login problem", error);
    }
  };

  //*========================================End: handle submit

  return (
    <div className="loginSection grid gridTwoTemplate">
      <div>
        <img src={loginImage} className="img" />
      </div>
      <div>
        <h1 className="heading">Login Form</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            autoComplete="off"
            onChange={handleInput}
            value={userLogin.email}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            autoComplete="off"
            value={userLogin.password}
            onChange={handleInput}
          />

          <button className="btn">Login Now</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
