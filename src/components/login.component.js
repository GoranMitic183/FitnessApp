import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Calendar from "./calendar.component";

function Login() {
  const [formData, setLoginData] = useState({
    username: "",
    hpassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...formData, [name]: value });
  };

  const { isLoading, error, data } = useQuery(
    ["login"],
    async () => {
      const response = await axios.post(
        "https://localhost:3001/login",
        formData
      );
      return response.data;
    },
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    if (data) {
      localStorage.setItem("token", data.token);
      alert("Successful login!");
    }
  };

  return (
    <div>
      <form onSubmit={()=>handleLogin}>
        <h2>Login</h2>
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
          id="hpassword"
          name="hpassword"
          value={formData.hpassword}
          onChange={handleInputChange}
          required
        />
         <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Register"}
      </button>
        {data && <NavLink to='/calendar'>{<Calendar></Calendar>}</NavLink>}
      </form>
    </div>
  );
}

export default Login;
