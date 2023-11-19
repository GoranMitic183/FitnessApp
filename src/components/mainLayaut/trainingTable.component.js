import React from "react";
import { BlogContext } from "../../store/blogContext";
import { useContext } from "react";

const TrainingTable = ({ ...props }) => {
  const { data } = props;
  console.log(data[0]);

  const { setVideoUrlHandler } = useContext(BlogContext)

  const handleVideoUrl = (url) => {
    setVideoUrlHandler(url)
  }



  return (
    <div style={{ background: "#d3d3d3" }}>
      <h3>{data[0].title}</h3>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">week</th>
            <th scope="col">Mon</th>
            <th scope="col">Wed</th>
            <th scope="col">Fri</th>
            <th scope="col">Sun</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(data[0].program).map((week, index) => {
            const weekData = Object.values(week)[0];
            const weekDataValues = Object.values(weekData);
            // const videoUrl = weekDataValues[1]
            // console.log(videoUrl);
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                {weekDataValues.map((day, dayIndex) => (
                  // const videoUrl = Object.values(day)[1]
                  <td onClick={() => handleVideoUrl(Object.values(day)[1])} key={dayIndex}>{Object.values(day)[0]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TrainingTable;
