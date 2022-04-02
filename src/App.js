import Home from "./components/Home";
import PoseEstimation from "./components/PoseEstimation";
import BluetoothSetup from "./components/BluetoothSetup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ExerciseScreen from "./components/ExerciseScreen";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default function App() {

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAj1Z19i28xURUyf1joRCl2B835g6i3Hjw",
  authDomain: "innate-entry-331721.firebaseapp.com",
  projectId: "innate-entry-331721",
  storageBucket: "innate-entry-331721.appspot.com",
  messagingSenderId: "332900074138",
  appId: "1:332900074138:web:70853c8b121c5e093a1523",
  measurementId: "G-KTM90EZDYC" //optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

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