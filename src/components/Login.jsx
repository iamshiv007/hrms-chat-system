import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const LoginUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:7070/api/user/login", { name, email })
      .then((res) => {
        alert(res.data.message);
        sessionStorage.setItem("_id", res.data.user._id);
        sessionStorage.setItem("email", res.data.user.email);
        sessionStorage.setItem("name", res.data.user.name);
        navigate("/chatbox");
      })
      .catch((err) => alert(err.response.data.message));
  };

  return (
    <div
      style={{
        background: "pink",
        width: "40%",
        margin: "auto",
        padding: "20px",
        borderRadius: "5px",
        marginTop: "10%",
      }}
    >
      <form action="" onSubmit={LoginUser}>
        <div>
          <label htmlFor="">Name</label>
          <input
            name="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            style={{ margin: "10px", padding: "10px" }}
          />
        </div>
        <div>
          <label htmlFor="">email</label>
          <input
            name="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            style={{ margin: "10px", padding: "10px" }}
          />
        </div>
        <input
          type="submit"
          value="Login"
          style={{
            marginTop: "10px",
            background: "gray",
            padding: "8px",
            borderRadius: "4px",
            color: "white",
          }}
        />
      </form>
    </div>
  );
};

export default Login;
