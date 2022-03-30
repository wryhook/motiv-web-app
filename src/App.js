import Home from "./components/Home";
import PoseEstimation from "./components/PoseEstimation";
import BluetoothSetup from "./components/BluetoothSetup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ExerciseScreen from "./components/ExerciseScreen";

export default function App() {
  return (
    <Router>
      <div style={styles.body}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/bluetooth" element={<BluetoothSetup />} />
          <Route path="/Webcam" element={<PoseEstimation />} />
          <Route path="/exercise" element={<ExerciseScreen />} />
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