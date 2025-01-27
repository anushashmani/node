import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const [user, setUser] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log("dkaladsa", user);
    // setUser([user, ""]);
  };

  const onSubmit = async () => {
    console.log("final result", user);
    // setUser([...user]);
    // console.log("user", user);
    try {
      const response = await axios.post(
        "http://localhost:3001/user/login",
        user,
        {
          method: "POST",
          header: {
            Content_Type: "application/json",
          },
          body: JSON.stringify(user),
        }
        // navigate("/login")
      );
      if (!response.ok) {
        alert("bsdk");
      } else {
        alert("all ok");
      }
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
    // setUser([""]);
  };
  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="name"
          name="name"
          onChange={handleChange}
        />
        <br />
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <br />
        <button type="submit">ADD</button>
      </form>
    </>
  );
};
export default Login;
