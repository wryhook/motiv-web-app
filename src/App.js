import Home from "./components/Home";
import Setup from "./components/Setup";
import BluetoothSetup from "./components/BluetoothSetup";

export default function App() {
  return (
    <div style={styles.body}>
      <BluetoothSetup />
    </div>
  )
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
}