import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const signupUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:7070/api/user/new", {
        fullName: name,
        email,
        password,
        confirmPassword,
      })
      .then((res) => {
        alert(res.data.message);
        // navigate("/chatbox");
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
      <form action="" onSubmit={signupUser}>
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
        <div>
          <label htmlFor="">password</label>
          <input
            name="password"
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            style={{ margin: "10px", padding: "10px" }}
          />
        </div>

        <div>
          <label htmlFor="">confirm password</label>
          <input
            name="confirmPassword"
            type="text"
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ margin: "10px", padding: "10px" }}
          />
        </div>

        <input
          type="submit"
          value="Sign Up"
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

export default Signup;