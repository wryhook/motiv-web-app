import Home from "./components/Pages/Home";
import Setup from "./components/Setup";
import BluetoothSetup from "./components/BluetoothSetup";
import Main from "./components/Main";
import TodaysSessionCard from "./components/Pages/TodaysSessionCard";
import Sidebar from "./components/Sidebar";

/* callbackFunction = (IMU_angle) => {
this.setState({message: IMU_angle})
} */

export default function App() {

  return (
    <div style={styles.body}>
      <Sidebar />
      <Main />
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