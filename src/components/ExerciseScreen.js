import styled from "styled-components"
import { useState } from "react"
import { useCallback } from "react"
import PoseEstimation from "./PoseEstimation"
import BluetoothSetup from "./BluetoothSetup"

export default function ExerciseScreen() {
    const [cameraReps, setCameraReps] = useState(0)
    const [bluetoothReps, setBluetoothReps] = useState(0)
    
    const incrementCameraReps = useCallback(() => {
        setCameraReps(prevReps => prevReps + 1)
    }, [setCameraReps])

    const incrementBluetoothReps = useCallback(() => {
        setBluetoothReps(prevReps => prevReps + 1)
    }, [setBluetoothReps])

    return (
        <div style={styles.container}>
            <div style={styles.repsDisplay}>
                Camera: {cameraReps}, Bluetooth: {bluetoothReps}
            </div>
            <BluetoothSetup updateReps={incrementBluetoothReps} />
            <PoseEstimation updateReps={incrementCameraReps}/>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100vw',
    },
    repsDisplay: {
        fontSize: '4rem'
    }
  }