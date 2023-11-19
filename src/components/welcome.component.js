import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Cards from "./mainLayaut/cards.component";
import classes from "./welcome.module.css";
import { Register } from "./register.component";
import clases from "../components/mainLayaut/style.module.css"

const Welcome = () => {
  const navigate = useNavigate();
  // const [isRegisterForm, setIsRegisterForm] = useState(true)

  const handleContinue = (e) => {
    e.preventDefault();
    navigate('/register')
    // setIsRegisterForm(false);
  };

  return (
    <>
    <div className={classes.welcomeBck}>
       <button
          className={`btn btn-outline-secondary ${classes.startBtn}`}
          onClick={handleContinue}
        >
          Start Your Journey Now!
        </button>
    </div>
    </>
  );
};

export default Welcome;
