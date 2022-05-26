import React from 'react'
import { useRef } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';
import Webcam from 'react-webcam';

const PoseEstimation = React.memo(({ updateInPosition, updateReps, updateAngle, rightLegChosen, targetAngle, updateRepMaxes }) => {
  const THRESHOLD = 15 // threshold for rep to begin being recorded
  const TARGET_ANGLE = targetAngle
  let legAngleRaw
  let legAngle
  let last3Angles = []
  let aboveThreshold = false
  let repAngles = []
  let repMaxes = []
  let reps = 0
  // let last3AverageAngles = []
  // let aboveThreshold = false
  // let repAngles = []
  // let reps = 0
  // let repMaxes = []
  // let newMaxAngle = 0
  // let maxAngle = 0
  const webcamRef = useRef(null)

  // let leftLegAngle, rightLegAngle
  //const [angle, setAngle] = useState(0)

  //  Load posenet
  const runModel = async () => {
    const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
    const model = poseDetection.SupportedModels.MoveNet
    const detector = await poseDetection.createDetector(model, detectorConfig);

      setInterval(() => {
        detect(detector);
      }, 100);

  };

  const detect = async (detector) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make Detections
      const poses = await detector.estimatePoses(video);
      
      let pose = poses[0]

      let knee = rightLegChosen ? pose.keypoints[14] : pose.keypoints[13]
      let ankle = rightLegChosen ? pose.keypoints[16] : pose.keypoints[15]

      if (pose.keypoints[14].score > 0.5 && pose.keypoints[16].score > 0.5) {
        updateInPosition(true)
      }
      
      // calculate leg angle
      legAngleRaw = Math.atan((ankle.y - knee.y) / (ankle.x - knee.x))
      legAngle = 90 - Math.abs(Math.floor(180 * (legAngleRaw)/Math.PI))

      console.log(legAngle)
      updateAngle(legAngle)

      if(last3Angles.length < 3){ //for rep counting, incorporate negative angles (signed angles)
        last3Angles.push(legAngle)
      }
      else {
        last3Angles.unshift(legAngle)
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
          repAngles.push(legAngle)
        }

        if(last3Angles[0] < THRESHOLD &&
        last3Angles[1] < THRESHOLD &&
        last3Angles[2] < THRESHOLD) {
          if(aboveThreshold){
            aboveThreshold = false
            reps += 1
            console.log(`REPS: ${reps}`)
            let repMax = Math.max.apply(Math, repAngles)
            if(repMax > TARGET_ANGLE){
              updateReps()
            }
            repMaxes.push(repMax)
            console.log(`ALL ANGLES RECORDED: ${repAngles}`)
            console.log(`REP MAX: ${repMax}`)
            console.log(`REP MAXES ARRAY: ${repMaxes}`)
            updateRepMaxes(repMaxes)
          }
        }
      }

      // if(last5Angles.length < 5) {
      //   last5Angles.push(rightLegAngle)
      // }
      // else {
      //   last5Angles.unshift(rightLegAngle)
      //   last5Angles.pop()

      //   let sum = last5Angles.reduce((a, b) => a + b, 0);
      //   averageAngle = sum / last5Angles.length

      //console.log(averageAngle)
        
      //   if(last3AverageAngles.length < 3){
      //     last3AverageAngles.push(averageAngle)
      //   }
      //   else {
      //     last3AverageAngles.unshift(averageAngle)
      //     last3AverageAngles.pop()

      //     if(last3AverageAngles[0] > THRESHOLD &&
      //       last3AverageAngles[1] > THRESHOLD &&
      //       last3AverageAngles[2] > THRESHOLD) {
      //       if(!aboveThreshold){
      //         aboveThreshold = true
      //         repAngles.length = 0
      //       }
      //     }
          
      //     if(aboveThreshold){
      //       repAngles.push(averageAngle)
      //     }

      //     if(last3AverageAngles[0] < THRESHOLD &&
      //     last3AverageAngles[1] < THRESHOLD &&
      //     last3AverageAngles[2] < THRESHOLD) {
      //       if(aboveThreshold){
      //         aboveThreshold = false
      //         reps += 1
      //         console.log(`REPS: ${reps}`)
      //         updateReps()
      //         let repMax = Math.max.apply(Math, repAngles)
      //         repMaxes.push(repMax)
      //         console.log(`ALL ANGLES RECORDED: ${repAngles}`)
      //         console.log(`REP MAX: ${repMax}`)
      //         console.log(`REP MAXES ARRAY: ${repMaxes}`)
      //       }
      //     }

      //     newMaxAngle = Math.max.apply(Math, last3AverageAngles)
      //     if(newMaxAngle > maxAngle){
      //       maxAngle = newMaxAngle
      //     }
      //     console.log(`max angle Camera: ${maxAngle}`)
        
      //     }
      //   }
    }
  };

  runModel()

  return (
        <div>
          <Webcam ref={webcamRef} style={styles.video} mirrored={true} />
        </div>
  );
})

const styles = {
  video: {
    zindex: 9,
    height: 480,
    width: 480 * (16 / 9),
    borderRadius: 20,
    border: '2px solid #4f4f4f',
  }
}

export default PoseEstimation