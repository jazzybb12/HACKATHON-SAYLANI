import React from 'react';
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'


function Charts() {
  Chart.register(ArcElement);
  const data = {
    labels: ["Airfare", "Food & Drinks", "Accommodation", "Transportation", "Activities", "Misc"],
    datasets: [
      {
        data: [20, 24, 20, 14, 12, 10],
        backgroundColor: [
          "#FF5733",
          "#FFC300",
          "#C70039",
          "#900C3F",
          "#581845",
          "#1E0B0E"
        ],
      }
    ]
  };

  const options = {
    animation: {
      animateRotate: true,
      animateScale: true
    }
  };

  return (
    <div style={{width:"400px"}}>
      <Pie itemType='line' data={data} options={options}/>
    </div>
  );
}

export default Charts;
