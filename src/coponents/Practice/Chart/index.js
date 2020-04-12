import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = props => {

  const data = canvas => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 1, 7, 0);
    return{
      backGroundColor : gradient
    }
  }

  const state = { 
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'RainFall',
        fill: false, 
        lineTension: 0.5, 
        backgroundColor: 'red',
        borderWidth: 1, 
        data: [65, 59, 80, 81, 56, 1]
      }
    ]
  }
  return(
    <div>
      <Line data = {state}
          options ={{title: {
            display: true,
            text: 'Average Rain fall per month',
            fontSize: 20
          },
          legend:{
            display: true, 
            position: 'right', 
          }
        }}
        />
    </div>
  )
}

export default Chart;