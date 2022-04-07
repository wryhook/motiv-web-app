// import {Line} from 'react-chartjs-2'
// import 'chart.js'

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function CreateGraph({ maximas, goal }) {
    const labels = getLabel(maximas);

const data = {
    labels: labels,
    datasets: [{
                data: getAngles(maximas), //want the angles from the helper function
                borderColor: "#3e95cd",
                tension: 0.5,
                label: 'Range of Motion',
                fill: true
                },
            {
                data: getGoal(goal,maximas), //want the goals from the helper function
                borderColor: "#97d95f",
                fill: false,
                tension: 0.5,
                label: 'Goal',
                pointRadius: 0
            }]
};
const options = {
    plugins: {
        legend: {
            display: true,
            labels: {
                font: {
                    size: 20,
                    weight:'bold'
                }
            }
        }
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'Repetitions (count)'
        },
            ticks: {
            // For a category axis, the val is the index so the lookup via getLabelForValue is needed
            callback: function(val, index) {
                // Hide every 2nd tick label
                return index % 2 !== 0 ? this.getLabelForValue(val) : '';
                }
            }
        },
        y: {
            title: {
                display: true,
                text: 'Angle (degrees)'
            }
        }
    }
};
  return <Line options={options} data={data} />;
}

/* function to return the number of reps */
function getLabel(maximas) {
    let time = new Array(2*maximas.length+1);
    let c = 1;
    for (let i=0;i<time.length;i++) {
        if (i%2==0) {
            time[i] = 0;
        }
        else if (i%2!=0) { //dont care about even numbers should be 0
            time[i] = c;
            c++;
        }
    }
    return time;
}

/* function to return the change in angle */
function getAngles(maximas) {
    let sin = new Array(2*maximas.length+1);
    let c = 0;
    for(let i=0;i<sin.length;i++) {
        if (i%2!=0) { //if odd then equal to maxima
            sin[i] = maximas[c]
            c++;
        }
        else{ //if even equal 0
            sin[i] = 0;
        }
    }
    return sin;
}

/* function to return the straight line threshold */
function getGoal(goal,maximas) {
    return new Array(2*maximas.length+1).fill(goal);
}