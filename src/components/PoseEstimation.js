import React from 'react'
import { useRef } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
// import * as tf from '@tensorflow/tfjs-core';
// Register one of the TF.js backends.
import '@tensorflow/tfjs-backend-webgl';
// import '@tensorflow/tfjs-backend-wasm';
// import * as mpPose from '@mediapipe/pose';
import Webcam from 'react-webcam';

const PoseEstimation = React.memo(({ updateReps }) => {
  let last5Angles = []
  let averageAngle
  let last3AverageAngles = []
  let aboveThreshold = false
  let halfReps = 0
  let prevFullReps = 0
  let fullReps = 0
  let newMaxAngle = 0
  let maxAngle = 0
  const webcamRef = useRef(null)

  let leftLegAngle, rightLegAngle
  //const [angle, setAngle] = useState(0)

  //  Load posenet
  const runModel = async () => {
    const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
    const model = poseDetection.SupportedModels.MoveNet
    const detector = await poseDetection.createDetector(model, detectorConfig);

    setInterval(() => {
      detect(detector);
      //console.log(totalAngleDegrees)
        
      //   console.log(totalAngleDegrees)
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
      
      // Calculate leg angle
      //let leftangle1 = Math.atan((poses[0].keypoints[14].y - poses[0].keypoints[12].y) / (poses[0].keypoints[12].x - poses[0].keypoints[14].x))
      let rightAngleRaw = Math.atan((poses[0].keypoints[16].y - poses[0].keypoints[14].y) / (poses[0].keypoints[16].x - poses[0].keypoints[14].x))
      rightLegAngle = 90 - Math.abs(Math.floor(180 * (rightAngleRaw)/Math.PI))
      updateReps(rightLegAngle)


      // let rightangle1 = Math.atan((poses[0].keypoints[13].y - poses[0].keypoints[11].y) / (poses[0].keypoints[13].x - poses[0].keypoints[11].x))
      // let rightangle2 = Math.atan((poses[0].keypoints[15].y - poses[0].keypoints[13].y) / (poses[0].keypoints[13].x - poses[0].keypoints[15].x))
      // rightLegAngle = Math.floor(180 * (rightangle1 + rightangle2)/Math.PI)
      
      // console.log(`Right leg angle: ${rightLegAngle}`)
      //console.log(`Right leg angle: ${rightLegAngle}`)
      // if(totalAngleDegrees < 0) {
      //   totalAngleDegrees = 180 + totalAngleDegrees
      // }

      if(last5Angles.length < 5) {
        last5Angles.push(rightLegAngle)
      }
      else {
        last5Angles.unshift(rightLegAngle)
        last5Angles.pop()

        let sum = last5Angles.reduce((a, b) => a + b, 0);
        averageAngle = sum / last5Angles.length

        console.log(averageAngle)
        
        if(last3AverageAngles.length < 3){
          last3AverageAngles.push(averageAngle)
        }
        else {
          last3AverageAngles.unshift(averageAngle)
          last3AverageAngles.pop()
          if(last3AverageAngles[0] > 45 &&
             last3AverageAngles[1] > 45 &&
             last3AverageAngles[2] > 45) {
               if(!aboveThreshold){
                 aboveThreshold = true
                 halfReps += 1
               }
             }
          if(last3AverageAngles[0] < 45 &&
          last3AverageAngles[1] < 45 &&
          last3AverageAngles[2] < 45) {
            if(aboveThreshold){
              aboveThreshold = false
              halfReps += 1
            }
          }

          prevFullReps = fullReps
          fullReps = Math.floor(halfReps / 2)

          if(fullReps > prevFullReps) {
            //updateReps()
          }

          newMaxAngle = Math.max.apply(Math, last3AverageAngles)
          if(newMaxAngle > maxAngle){
            maxAngle = newMaxAngle
          }
          console.log(`max angle Camera: ${maxAngle}`)
        
          }
        }
    }
  };

  runModel();

  return (
        <Webcam ref={webcamRef} style={styles.video} mirrored={true} />
  );
})

const styles = {
  video: {
    zindex: 9,
    height: 480,
    width: 852,
    borderRadius: 20,
    border: '2px solid #4f4f4f',
  }
}

export default PoseEstimation