import React, { useEffect, useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Cards from "./cards.component";
import classes from "./home.module.css";
import Iframe from "react-iframe";
import TrainingTable from "./trainingTable.component";
import { fetchTrainings } from "../../query/fetchTrainingPlans";
import { toast } from "react-toastify";
import ContactForm from "./contact.component";
import Stopwatch from "./stopwatch.component";
import CalendarComponent from "./calendar.component";
import { Blog } from "./blog.component";
import NewBlog from "./newBlog.component";
import { BlogContext } from "../../store/blogContext";
import EditBlog from "./editBlog.component";
import SingleBlog from "./singleBlog.component";
import ReadMoreBlog from "./readMoreBlog.component";

const Home = () => {
  const { content, changeContentType, admin, adminCheck } =
    useContext(BlogContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["trainingPlans"],
    queryFn: () => fetchTrainings(),
  });

  console.log(data);
  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);

      if (parsedToken.role === 1) {
        adminCheck(true);
      }
    }
  }, []);

  const handleTrainingPlan = () => {
    const type = {
      target: {
        innerText: "table"
      }
    }
    changeContentType(type);
  };

  return (
    <>
      <div className={classes.backPic}>
        <div className={classes.btnContainer}>
          <button
            className={`btn btn-primary ${classes.startBtn}`}
            onClick={changeContentType}
          >
            Blog
          </button>
          {admin && (
            <button
              className={`btn btn-primary ${classes.startBtn}`}
              onClick={changeContentType}
            >
              AddNewBlog
            </button>
          )}

          <button
            className={`btn btn-primary ${classes.startBtn}`}
            onClick={changeContentType}
          >
            Calendar
          </button>
          <button
            className={`btn btn-primary ${classes.startBtn}`}
            onClick={changeContentType}
          >
            Stopwatch
          </button>
          <button
            className={`btn btn-primary ${classes.startBtn}`}
            onClick={changeContentType}
          >
            Contact
          </button>
        </div>
        <div className={classes.contentContainer}>
          {content === "blog" && <Blog />}
          {content === "table" && <TrainingTable data={data} />}
          {content === "contact" && <ContactForm />}
          {content === "calendar" && <CalendarComponent />}
          {content === "stopwatch" && <Stopwatch />}
          {content === "addnewblog" && <NewBlog />}
          {content === "singleblog" && <SingleBlog />}
          {content === "readmore" && <ReadMoreBlog />}
      {content === "editblog" && <EditBlog data={data}/>}
        </div>
        <Iframe
          url="https://www.youtube.com/embed/6grpJFNkiDs"
          width="550px"
          height="300px"
          id=""
          className={classes.video}
          display="block"
        />
      </div>

      <div className={`container ${classes.section}`}>
        <h1 className={classes.programTitle}>30 Day Program</h1>
        <div className={classes.cards}>
          {error && toast.error(error)}
          {isLoading && <p>Loading...</p>}
          {data &&
            data.map((plan) => {
              return (
                <Cards
                  key={plan._id}
                  onTrainingHandler={handleTrainingPlan}
                  image={plan.image}
                  title={plan.title}
                  description={plan.description}
                  price={plan.price}
                  program={plan.program}
                  data={data}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
