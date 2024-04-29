import React from "react";
import "./Error.css";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="errorSection">
      <h1>404</h1>
      <h2>sorry! page not found</h2>
      <p>
        Oops! It seems like the page you;re trying doesn't exist. If you believe
        there's an issue feel free to report it, and well look into it
      </p>
      <div>
        <Link to={"/"}>
          <button className="btn">Go Back Home</button>
        </Link>
        <Link to={"/"}>
          <button className="btn">Report Issue</button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
