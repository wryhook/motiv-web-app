import {Line} from 'react-chartjs-2'
import { useState, useEffect } from 'react/cjs/react.production.min';

// /* setup for data */
// const labels = getLabel(maximas); //want the labels from the helper function
// const data = {
//   labels: labels,
//   datasets: [{
//             data: getAngles(maximas), //want the angles from the helper function
//             borderColor: "#3e95cd",
//             fill: false,
//             tension: 0.5,
//             label: 'Range of Motion',
//             fill: true
//         },
//         {
//             data: getGoal(goal,maximas), //want the goals from the helper function
//             borderColor: "#3e9cd",
//             fill: false,
//             tension: 0.5,
//             label: 'Goal'
//         }]
// };
// /* config of graph */
// const config = {
//     type: 'line',
//     data: data,
//     options: {
//         scales: {
//             x: {
//                 title: {
//                     display: true,
//                     text: 'Repetitions (count)'
//             },
//                 ticks: {
//                 // For a category axis, the val is the index so the lookup via getLabelForValue is needed
//                 callback: function(val, index) {
//                     // Hide every 2nd tick label
//                     return index % 2 === 0 ? this.getLabelForValue(val) : '';
//                     }
//                 }
//             },
//             y: {
//                 title: {
//                     display: true,
//                     text: 'Angle (degrees)'
//                 }
//             }
//         },
//         plugins: {
//             title: {
//                 display: true,
//                 text: 'Range of Motion',
//                 padding: {
//                     top: 10,
//                     bottom: 30
//                 }
//             }
//         }
//     }
// };

export default function CreateGraph(maximas,goal) {
    const [chartData, setChartData] = useState({});
    const [chartConfig,setChartConfig] = useState({});

    useEffect(() => {
        setChartData(
        {
            labels: getLabel(maximas),
            datasets: [{
                        data: getAngles(maximas), //want the angles from the helper function
                        borderColor: "#3e95cd",
                        tension: 0.5,
                        label: 'Range of Motion',
                        fill: true
                    },
                    {
                        data: getGoal(goal,maximas), //want the goals from the helper function
                        borderColor: "#3e9cd",
                        fill: false,
                        tension: 0.5,
                        label: 'Goal'
                    }]
            }
        )
        setChartConfig(
        {
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
                        return index % 2 === 0 ? this.getLabelForValue(val) : '';
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Angle (degrees)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Range of Motion',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                }
            }
        }
        )
    }, []);

    return (
        <div style={styles.container}>
            <h1>
                Hello my name is Ryan
            </h1>
            {/* /* <Line 
                data={chartData}
                options={chartConfig}
            /> */}
        </div>

    )
}

/* function to return the number of reps */
function getLabel(maximas) {
    let time = new Array(2*maximas.length);
    let c = 0;
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
    let sin = new Array(2*maximas.length);
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
    return new Array(2*maximas.length).fill(goal);
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100vw',
    },
    repsDisplay: {
        fontSize: '4rem'
    }
  }