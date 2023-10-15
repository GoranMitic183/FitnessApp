import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom"; 

export const Register = () => {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const { isLoading, error, data, mutate } = useMutation(async (formData) => {
    const response = await axios.post(
      "https://localhost:3001/register",
      formData
    );
    return response.data;
  });
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate({formData});

    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;
    if (data.status === "ok") {
      alert("Successful registration!");
    }
  };

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register form</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Register"}
      </button>
      <br></br>
      {error && <div>An error has occurred: {error.message}</div>}
      {data && <NavLink to="/login">Login</NavLink>}
    </form>
  );
};
