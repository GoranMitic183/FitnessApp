import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useMutation } from "@tanstack/react-query";
import classes from "./login.module.css";
// import * as api from "../query/loginQuery";


function Login() {
  const [formData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...formData, [name]: value });
  };

  async function loginFn(formData) {
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // const response = await api.signIn(formData);
      if (!response.ok) {
        throw new Error("Failed to login. Please try again.");
      }
      const data = await response.json();
      localStorage.setItem('token', JSON.stringify({token:data.token, role:data.role, username:data.user.firstName}))
    } catch (error) {
      console.error("Error during login:", error.message);
      throw new Error("Failed to login. Please try again.");
    }
  }

  const { isError, mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginFn,
    onSuccess: () => {
      navigate('/home')
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.email.length > 3 && formData.password.length > 3) {
      mutate(formData);
    }
  };

  if (isError) {
    toast.error("Failed to login!");
  }

  return (
    <div className={classes.welcomeBck}>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "450px",
          alignContent: "center",
          marginTop: "120px",
        }}
      >
        <Toaster />
        <MDBCard alignment="center" style={{ opacity: "0.8" }}>
          <MDBIcon fas icon="user-circle" className="fa-2x" />
          <h5>Login</h5>
          <MDBCardBody>
            <MDBValidation
              onSubmit={handleLogin}
              noValidate
              className="row g-3"
            >
              <div className="col-md-12">
                <MDBInput
                  label="Email"
                  type="email"
                  value={formData.email}
                  name="email"
                  onChange={handleInputChange}
                  required
                  // invalid
                  validation="Please provide email"
                />
              </div>
              <div className="col-md-12">
                <MDBInput
                  label="Password"
                  type="password"
                  value={formData.password}
                  name="password"
                  onChange={handleInputChange}
                  required
                  // invalid
                  validation="Please provide password"
                />
              </div>

              <div className="col-12">
                <MDBBtn style={{ width: "100%" }} className="btn btn-secondary">
                  Login
                </MDBBtn>
              </div>
            </MDBValidation>
          </MDBCardBody>
          <MDBCardFooter>
            <Link to="/register">
              <p>Don't have account?Sign out</p>
            </Link>
          </MDBCardFooter>
        </MDBCard>
      </div>
    </div>
  );
}

export default Login;
