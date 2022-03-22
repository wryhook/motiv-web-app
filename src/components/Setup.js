import { useRef, useState } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
// Register one of the TF.js backends.
import '@tensorflow/tfjs-backend-webgl';
// import '@tensorflow/tfjs-backend-wasm';
import * as mpPose from '@mediapipe/pose';
import Webcam from 'react-webcam';

export default function Setup({CVToData}) {
  const webcamRef = useRef(null)
  //const [angle, setAngle] = useState(0)
  let last5Angles = []
  let averageAngle
  let last3AverageAngles = []
  let aboveThreshold = false
  let halfReps = 0

  //  Load posenet
  const runModel = async () => {
    const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
    const model = poseDetection.SupportedModels.MoveNet
    const detector = await poseDetection.createDetector(model, detectorConfig);

    setInterval(() => { 
      detect(detector);
      if(last5Angles.length >= 5){
        let sum = last5Angles.reduce((a, b) => a + b, 0);
        averageAngle = sum / last5Angles.length
        if(last3AverageAngles.length < 3){
          last3AverageAngles.push(averageAngle)
        }
        else {
          last3AverageAngles.unshift(averageAngle)
          last3AverageAngles.pop()
          if(last3AverageAngles[0] < 150 &&
             last3AverageAngles[1] < 150 &&
             last3AverageAngles[2] < 150) {
               if(!aboveThreshold){
                 aboveThreshold = true
                 halfReps += 1
               }
             }
          if(last3AverageAngles[0] > 150 &&
          last3AverageAngles[1] > 150 &&
          last3AverageAngles[2] > 150) {
            if(aboveThreshold){
              aboveThreshold = false
              halfReps += 1
            }
          }
        
          } 
        }
        console.log(Math.floor(halfReps / 2)) 
        CVToData(averageAngle) //send angle to be compared with IMU angle then do rep counting (in Data component) 
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
      
      // Calculate leg angle
      let angle1 = Math.atan((poses[0].keypoints[14].y - poses[0].keypoints[12].y) / (poses[0].keypoints[12].x - poses[0].keypoints[14].x))
      let angle2 = Math.atan((poses[0].keypoints[16].y - poses[0].keypoints[14].y) / (poses[0].keypoints[16].x - poses[0].keypoints[14].x))
      let totalAngleDegrees = Math.floor(180 * (angle1 + angle2)/Math.PI)
      if(totalAngleDegrees < 0) {
        totalAngleDegrees = 180 + totalAngleDegrees //CHANGE!? cuz we want unsigned angles to compare with IMU values
      }

      if(last5Angles.length < 5) {
        last5Angles.push(totalAngleDegrees)
      }
      else {
        last5Angles.unshift(totalAngleDegrees)
        last5Angles.pop()
      }
    }
  };

  runModel();

  return (
    <div style={styles.body}>
        {/* <h1 style={styles.text}>Angle: {angle} degrees</h1> */}
        <Webcam ref={webcamRef} style={styles.video} mirrored={true} />
        <canvas style={styles.video} />
    </div>
  );
}

const styles = {
  body: {
    background: '#d4f0ff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  video: {
    position: "absolute",
    margin: "auto",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    textAlign: "center",
    zindex: 9,
    height: 480,
    width: 852,
    borderRadius: 20,
    border: '2px solid #4f4f4f',
  },
  text: {
    color: '#4f4f4f',
    fontSize: '3rem',
    position: 'absolute',
    top: 0,
  }
}