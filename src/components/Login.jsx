import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../features/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LoginUser = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      alert("Logged In Successfully");
      navigate("/chatbox");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      style={{
        background: "pink",
        width: "60%",
        margin: "auto",
        padding: "20px",
        borderRadius: "5px",
        marginTop: "10%",
      }}
    >
      <form action="" onSubmit={LoginUser}>
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
