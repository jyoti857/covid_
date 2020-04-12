import React from 'react';
import { Line } from 'react-chartjs-2';


const StatusChart = props => {

  const dates = [];
  const confirmed = [];
  const active = [];
  const recovered = [];
  const deceased = [];

  const dataset = {
    labels: dates,
    datasets: [
      {
        borderWidth: 2,
        data: confirmed, 
        borderCapStyle: 'round',
        pointBackgroundColor: "#ff073a",
        label: 'confirmed',
        borderColor: '#ff073a',
        pointHoverRadius: 2,   
      }
    ] 
  };
  const options = {
    responsive : true,
    events:[
      'click', 
      'mousemove',
    ]
  }
  return(
    <div className = 'charts-header'>
      <div className = 'chart-title'>
        <div className = 'chart-content'>
          <Line data = {dataset} options = {options}/>
        </div>
      </div> 
    </div>
  )
}

export default StatusChart;