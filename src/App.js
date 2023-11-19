import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import MainLayaut from "./components/mainLayaut/mainLayaut.component";
import { Register } from "./components/register.component";
import Login from "./components/login.component";
import Welcome from "./components/welcome.component";
import Home from "./components/mainLayaut/home.component";
import { ToastContainer } from "react-toastify";
import BuyForm from "./components/buy.component";
import { queryClient } from "./query/blogsQuery";
import BlogContextProvider from "./store/blogContext";

function App() {
  return (
    <BlogContextProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<MainLayaut />}>
              <Route index element={<Welcome />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/buy" element={<BuyForm />}></Route>
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </BlogContextProvider>
  );
}

export default App;
