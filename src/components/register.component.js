import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import classes from "./register.module.css";
import * as api from "../query/loginQuery";


export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const registerFn = async (formData) => {
    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // const response = await api.signUp(formData);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', JSON.stringify({token:data.token, role:data.role, username:data.user.firstName}))

        return data;
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
      throw new Error("Failed to register. Please try again.");
    }
  };

  const { mutate, isLoading, isError, isSuccess, error } = useMutation({
    mutationKey: ["registration"],
    mutationFn: registerFn,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords should match!");
    }
    if (
      formData.password.length < 3 ||
      formData.confirmPassword.length < 8 ||
      formData.firstName.length < 3
    ) {
      return;
    }
    mutate(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (isError) {
    console.log(error);
    toast.error(error.message);
  }

  if (isSuccess) {
    toast.success("Register Successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
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
          <h5>Sign Up</h5>
          <MDBCardBody>
            <MDBValidation
              onSubmit={handleSubmit}
              noValidate
              className="row g-3"
            >
              <div className="col-md-6">
                <MDBInput
                  label="First Name"
                  type="text"
                  value={formData.firstName}
                  name="firstName"
                  onChange={handleInputChange}
                  required
                  // invalid
                  validation="Please provide first name"
                />
              </div>
              <div className="col-md-6">
                <MDBInput
                  label="Last Name"
                  type="text"
                  value={formData.lastName}
                  name="lastName"
                  onChange={handleInputChange}
                  required
                  // invalid
                  validation="Please provide last name"
                />
              </div>
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
              <div className="col-md-12">
                <MDBInput
                  label="Password Confirm"
                  type="password"
                  value={formData.confirmPassword}
                  name="confirmPassword"
                  onChange={handleInputChange}
                  required
                  // invalid
                  validation="Please provide confirm password"
                />
              </div>
              <div className="col-12">
                <MDBBtn style={{ width: "100%" }} className="btn btn-secondary">
                  {/* {register.isLoading && (
             <MDBSpinner
               size="sm"
               role="status"
               tag="span"
               className="me-2"
             />
           )} */}
                  Register
                </MDBBtn>
              </div>
            </MDBValidation>
          </MDBCardBody>
          <MDBCardFooter>
            <Link to="/login">
              <p>Already have an account ? Sign In</p>
            </Link>
          </MDBCardFooter>
        </MDBCard>
      </div>
    </div>
  );
};
