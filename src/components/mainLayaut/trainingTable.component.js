import React from "react";

const TrainingTable = ({ ...props }) => {
  const { data } = props;

  console.log("TRAIN", data[0].program);

  return (
    <div>
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
            console.log(week);
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                {/* {week.map((day, dayIndex) => (
                  <td key={dayIndex}>{Object.values(day)}</td>
                ))} */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TrainingTable;


