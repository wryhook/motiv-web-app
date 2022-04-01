import Chart from 'chart.js/auto'

/* plot the graph */
function plotChart(data,time,goal) {
    let chart = new Chart (ctx,
        {
        type: 'line',
        data: 
        {
            labels: time,
            datasets: [{
            data: data,
            borderColor: "#3e95cd",
            fill: false,
            tension: 0.5,
            label: 'Range of Motion'
        },
        {
            data: goal,
            borderColor: "#3e95cd",
            fill: false,
            tension: 0.5,
            label: 'Goal'
        }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time (s)'
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
        })
};

/* get the time array and data array to be graphed -- called before getThreshold */
function getData(time,maximas) {
    var dt = time/(2*maximas)
    var time = new Array(2*maximas)
    var data = new Array(2*maximas)

    var c
    for (var i=0;i<data.length;++i) {
        if (i==0) {
            data[i]=0
        }
        else {
            data[i]=maximas[c]
            c++
        }
    }

    time.forEach(function(part,index){
        this[index]=index*dt
    })
    return [data,time]
}

/* get the array of len L to draw straight line at threshold angle for graph */
function getThreshold(time,goal) {
    var thres = new Array(time.length)
    for (var i=0;i<thres.length;++i) {
        thres[i] = goal
    }
    return thres
}

