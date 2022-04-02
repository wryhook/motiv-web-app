import Home from "./components/Home";
import PoseEstimation from "./components/PoseEstimation";
import BluetoothSetup from "./components/BluetoothSetup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ExerciseScreen from "./components/ExerciseScreen";
import Tutorial from "./components/exercise-setup-screens/Tutorial";
import CameraSetup from "./components/CameraSetup";

export default function App() {

  return (
    <Router>
      <div style={styles.body}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bluetooth" element={<BluetoothSetup />} />
          <Route path="/webcam" element={<PoseEstimation />} />
          <Route path="/exercise" element={<ExerciseScreen />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/camera-setup" element={<CameraSetup />} />
        </Routes>
      </div>
    </Router>
  )
}

const styles = {
  body: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
}