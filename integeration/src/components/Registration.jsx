import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
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
        "http://localhost:3001/user/signup",
        user,
        {
          method: "POST",
          header: {
            Content_Type: "application/json",
          },
          body: JSON.stringify(user),
        },
        navigate("/login")
      );
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
    // setUser([""]);
  };
  return (
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
  );
};
export default Registration;
