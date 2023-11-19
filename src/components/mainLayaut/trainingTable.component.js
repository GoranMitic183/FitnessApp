import React from "react";

const TrainingTable = ({ ...props }) => {
  
  const { data } = props;

  console.log('TRAIN', data);

  return (
    // <div>
    //   <h3>{data[0].title}</h3>
    // <table className="table table-dark table-striped">
    //   <thead>
    //     <tr>
    //       <th scope="col">week</th>
    //       <th scope="col">Mon</th>
    //       <th scope="col">Wed</th>
    //       <th scope="col">Fri</th>
    //       <th scope="col">Sun</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {Object.values(data[0].program).map((week, index) => {
    //       return (
    //         <tr>
    //           <th scope="row" key={index}>
    //             {index + 1}
    //           </th>
    //           {week.map((day, dayIndex) => {
    //             return <td key={dayIndex}>{Object.values(day)}</td>;
    //           })}
    //         </tr>
    //       );
    //     })}
    //   </tbody>
    // </table>
    // </div>

        // "image": "https://static.wixstatic.com/media/d1d11f_b9bf77d9759444368b9e713c79354105~mv2.png/v1/fill/w_640,h_448,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/d1d11f_b9bf77d9759444368b9e713c79354105~mv2.png",


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
      {/* <tbody>
        {Object.entries(data[0]?.program).map(([week, days], index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            {Object.entries(days).map(([day, exercise], dayIndex) => (
              <td key={dayIndex}>{exercise}</td>
            ))}
          </tr>
        ))}
      </tbody> */}
    </table>
  </div>
  );
};
export default TrainingTable;
