import React, { useState } from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (user) => {
    console.log("user", user);
    // e.prevenetDefault();
    console.log("ajdalksjd");
    try {
      const response = await fetch("http://localhost:3001/user/signup", {
        method: "POST",
        header: {
          Content_Type: "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="name"
        {...register("name", { required: true })}
      />
      {errors.name && <span>required</span>}
      <br />
      <input
        type="email"
        placeholder="email"
        {...register("email", { required: true })}
      />
      {errors.email && <span>required</span>}
      <br />
      <input
        type="password"
        placeholder="password"
        {...register("password", { required: true })}
      />
      {errors.password && <span>required</span>}
      <br />
      <button type="submit">ADD</button>
    </form>
  );
};
export default SignUp;
