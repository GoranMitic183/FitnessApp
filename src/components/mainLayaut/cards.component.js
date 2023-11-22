import React, { useState } from "react";
// import { Link } from "react-router-dom";
import classes from "./cards.module.css";
import { useNavigate } from "react-router-dom";

const Cards = ({ onTrainingHandler,...props }) => {
  const navigate = useNavigate();
const [isRegister, setIsRegister] = useState(false);
const { image, title, description, price, id} = props
  const onBuyHandler = () => {
    // const program = id;
    // if(localStorage.getItem('token')){
    //  return navigate('/buy')
    // }
    // setIsRegister(true);
    // setTimeout(()=>{
    //   setIsRegister(false);
    // },4000)
    // navigate('/buy')
  }

  return (
    <div className="container">
      <div
        className={`card ${classes.cards}`}
        style={{ width: "18rem" ,marginBottom: "3rem", cursor: "pointer", height: "25rem"}}
        onClick={onTrainingHandler}
      >
        <img src={image} className="card-img-top" alt="Training plan" style={{height:"10rem"}}/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
           {description}
          </p>
          <button onClick={onBuyHandler} className="btn btn-outline-secondary">
          {`Buy ${price}$`}
          </button>
          {isRegister && <p>You must be registered!</p>}
        </div>
      </div>
    </div>
  );
};

export default Cards;
