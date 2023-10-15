import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate();

    const handleContinue = (e)=>{
        e.preventDefault()
        navigate('/register')
    }

  const handleToLogin = (e)=>{
    e.preventDefault()
    navigate('/login')
}

  return (
    <div className="container">
      <h1>Welcome</h1>
      <button className="btn btn-primary" onClick={handleContinue}>Register</button>
      <button className="btn btn-primary" onClick={handleToLogin}>Login</button>

    </div>
  );
};

export default Welcome;
