import React from 'react'
import { useRef } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
// import * as tf from '@tensorflow/tfjs-core';
// Register one of the TF.js backends.
import '@tensorflow/tfjs-backend-webgl';
// import '@tensorflow/tfjs-backend-wasm';
// import * as mpPose from '@mediapipe/pose';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom';

const PoseEstimation = React.memo(({ updateReps, updateCameraAngle, updatePosition }) => {
  // const THRESHOLD = 20
  // let last5Angles = []
  // let averageAngle
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
        console.log("pose estimation running")
        detect(detector);
      }, 500);

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

      console.log(poses[0])

      let pose = poses[0]

      // if (
      //   pose.keypoints[16].score > 0.4 && 
      //   pose.keypoints[14].score > 0.4
      // ) {
      //   updatePosition()
      // }
      
      // let rightAngleRaw = Math.atan((poses[0].keypoints[16].y - poses[0].keypoints[14].y) / (poses[0].keypoints[16].x - poses[0].keypoints[14].x))
      // rightLegAngle = 90 - Math.abs(Math.floor(180 * (rightAngleRaw)/Math.PI))

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
    height: 360,
    width: 640,
    borderRadius: 20,
    border: '2px solid #4f4f4f',
  }
}

export default PoseEstimation