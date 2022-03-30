import Home from "./components/Pages/Home";
import Setup from "./components/Setup";
import BluetoothSetup from "./components/BluetoothSetup";
import Main from "./components/Main";
import TodaysSessionCard from "./components/Pages/TodaysSessionCard";
import Sidebar from "./components/Sidebar";
import Data from "./components/Data"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

/* callbackFunction = (IMU_angle) => {
this.setState({message: IMU_angle})
} */

export default function App() {

  const firebaseConfig = {  // web app Firebase configuration
    apiKey: "AIzaSyAj1Z19i28xURUyf1joRCl2B835g6i3Hjw",
    authDomain: "innate-entry-331721.firebaseapp.com",
    projectId: "innate-entry-331721",
    storageBucket: "innate-entry-331721.appspot.com",
    messagingSenderId: "332900074138",
    appId: "1:332900074138:web:70853c8b121c5e093a1523",
    measurementId: "G-KTM90EZDYC" // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  return (
    <div style={styles.body}>
      <Data />
      {/* <BluetoothSetup />
      <Setup /> */}
    </div>
  )
}

const styles = {
  body: {
    background: '#d4f0ff',
    display: 'flex',
    flexDirection: 'colsumn',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
}