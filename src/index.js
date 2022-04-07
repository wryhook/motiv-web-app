import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./components/Home";
import PoseEstimation from "./components/PoseEstimation";
import BluetoothSetup from "./components/BluetoothSetup";
import ExerciseScreen from "./components/ExerciseScreen";
import Tutorial from "./components/exercise-setup-screens/Tutorial";
import CameraSetup from "./components/CameraSetup";
import Welcome from "./components/exercise-setup-screens/Welcome";
import SelectExercise from './components/exercise-setup-screens/SelectExercise';
import ExerciseSetup from './components/ExerciseSetup';
import ConfigureLeg from './components/exercise-setup-screens/ConfigureExercise';
import ConfigureReps from './components/exercise-setup-screens/ConfigureReps';
import EndingScreen from './components/EndingScreen';
import CreateGraph from './components/ReportCard';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExerciseSetup />} />
        <Route path="/bluetooth" element={<BluetoothSetup />} />
        <Route path="/webcam" element={<PoseEstimation />} />
        <Route path="/exercise" element={<ExerciseScreen />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/camera-setup" element={<CameraSetup />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/select-exercise" element={<SelectExercise />} />
        <Route path="/configure-exercise" element={<ConfigureLeg />} />
        <Route path="/configure-reps" element={<ConfigureReps />} />
        <Route path="/home-screen" element={<Home />} />
        <Route path="/ending-screen" element={<EndingScreen />} />
        <Route path="/reportcard" element={<CreateGraph />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
