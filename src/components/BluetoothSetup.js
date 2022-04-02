import { useState } from "react"

function BluetoothSetup(props) {
  const THRESHOLD = 15
  let last3Angles = []
  let aboveThreshold = false
  let repAngles = []
  let repMaxes = []
  let prevReps = 0
  let reps = 0
  let newMaxAngle = 0
  let maxAngle = 0
  
  const [isConnected, setIsConnected] = useState(false)

  const styles = {
    button: {
        backgroundColor: isConnected ? '#27AE60' : '#5693B6',
        color: '#ffffff',
        padding: '0.5rem',
        paddingRight: '1.5rem',
        paddingLeft: '1.5rem',
        borderRadius: 20,
        border: '1px solid #4f4f4f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.25rem',
        fontWeight: '600',
        cursor: 'pointer',
        margin: '1rem'
      }
  } 

  function handleClick() {
    console.log("HandleClick ran")
    navigator.bluetooth.requestDevice({ filters: [{ 
      name: ['Motiv_Sensor_Master'] 
    }],
    optionalServices: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b'] // Required to access service later.
    })
    .then(device => device.gatt.connect())
    .then(server => {
      // Getting  Service…
      return server.getPrimaryService('4fafc201-1fb5-459e-8fcc-c5c9c331914b');
    })
    .then(service => {
      // Getting Characteristic…
      return Promise.all([
        service.getCharacteristic('beb5483e-36e1-4688-b7f5-ea07361b26a8')
          .then(handleCharacteristic)
      ])
    })
  }

  function handleCharacteristic(characteristic) {
    setIsConnected(true)
    props.setBluetoothStatusTrue()
    setInterval(() => {
      //console.log("handleChar ran")
      
      return characteristic.readValue()
      .then(value => {
        //const [angle, setAngle] = useState(0)
        
        let angle = value.getInt8(0); 
        
       /*  if(angle > 255/2){  //getting signed angles from unsigned int value
            angle = angle - 255; 
        } */


        props.updateAngle(angle)
        console.log('Angle: ', angle)
        
        if(last3Angles.length < 3){ //for rep counting, incorporate negative angles (signed angles)
          last3Angles.push(angle)
        }
        else {
          last3Angles.unshift(angle)
          last3Angles.pop()

          if(last3Angles[0] > THRESHOLD &&
            last3Angles[1] > THRESHOLD &&
            last3Angles[2] > THRESHOLD) {
            if(!aboveThreshold){
              aboveThreshold = true
              repAngles.length = 0
            }
          }
          
          if(aboveThreshold){
            repAngles.push(angle)
          }

          if(last3Angles[0] < THRESHOLD &&
          last3Angles[1] < THRESHOLD &&
          last3Angles[2] < THRESHOLD) {
            if(aboveThreshold){
              aboveThreshold = false
              reps += 1
              console.log(`REPS: ${reps}`)
              props.updateReps()
              let repMax = Math.max.apply(Math, repAngles)
              repMaxes.push(repMax)
              console.log(`ALL ANGLES RECORDED: ${repAngles}`)
              console.log(`REP MAX: ${repMax}`)
              console.log(`REP MAXES ARRAY: ${repMaxes}`)
            }
          }
        }

        // if(last5Angles.length < 5) {

        //   last5Angles.push(angle)
        // }
        // else {
        //   last5Angles.unshift(angle)
        //   last5Angles.pop()
  
        //   let sum = last5Angles.reduce((a, b) => a + b, 0);
        //   averageAngle = sum / last5Angles.length
  
        //   console.log(averageAngle)
          
        //   if(last3AverageAngles.length < 3){
        //     last3AverageAngles.push(averageAngle)
        //   }
        //   else {
        //     last3AverageAngles.unshift(averageAngle)
        //     last3AverageAngles.pop()
        //     if(last3AverageAngles[0] > 45 &&
        //        last3AverageAngles[1] > 45 &&
        //        last3AverageAngles[2] > 45) {
        //          if(!aboveThreshold){
        //            aboveThreshold = true
        //            halfReps += 1
        //          }
        //        }
        //     if(last3AverageAngles[0] < 45 &&
        //     last3AverageAngles[1] < 45 &&
        //     last3AverageAngles[2] < 45) {
        //       if(aboveThreshold){
        //         aboveThreshold = false
        //         halfReps += 1
        //       }
        //     }
  
        //     prevFullReps = fullReps
        //     fullReps = Math.floor(halfReps / 2)
  
        //     if(fullReps > prevFullReps) {
        //       props.updateReps()
        //     }
  
        //     newMaxAngle = Math.max.apply(Math, last3AverageAngles)
        //     if(newMaxAngle > maxAngle){
        //       maxAngle = newMaxAngle
        //     }
        //     console.log(`max angle IMU: ${maxAngle}`)
          
        //     }
        //   }
        //IMUToData(angle)//to be compared with CV angle and/or then used in rep counting or try angle.onchange ??? 
      })
    }, 200)
  }

  return (
    <div>
      <div style={styles.button} onClick={handleClick}>
        {
          isConnected ? 
          <div>☑️ Connected to sensor</div> :
          <div>Connect to sensor</div>
        }
      </div>
    </div>
  );
}

export default BluetoothSetup;