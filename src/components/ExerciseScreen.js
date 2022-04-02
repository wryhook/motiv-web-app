import styled from "styled-components"
import { useState, useEffect } from "react"
import { useCallback } from "react"
import PoseEstimation from "./PoseEstimation"
import BluetoothSetup from "./BluetoothSetup"
import PairingInstructions from "./PairingInstructions"
import AngleVisualizer from "./AngleVisualizer"
import Webcam from 'react-webcam';

export default function ExerciseScreen() {
    const [cameraAngle, setCameraAngle] = useState(0)
    const [bluetoothReps, setBluetoothReps] = useState(0)
    const [reps, setReps] = useState(0)
    const [isConnected, setIsConnected] = useState(false)


    const setBluetoothStatusTrue = () => {
        setIsConnected(true)
    }
    
    const updateReps = useCallback(() => {
        setReps(prevReps => prevReps + 1)
    }, [setReps])

    const updateCameraAngle = useCallback((cameraAngle) => {
        setCameraAngle(cameraAngle)
    }, [setCameraAngle])

    const incrementBluetoothReps = useCallback(() => {
        setBluetoothReps(prevReps => prevReps + 1)
    }, [setBluetoothReps])


    return (
        <div style={styles.container}>
            {
                isConnected ?
                <div style={styles.displayItems}>
                    <div style={styles.repsDisplay}>
                        {cameraAngle}
                    </div>
                    
                </div> :
                <PairingInstructions />
            }
            <BluetoothSetup 
                updateReps={incrementBluetoothReps}
                setBluetoothStatusTrue={setBluetoothStatusTrue}
                updateAngle={updateCameraAngle}
            />
            {
                isConnected ?
                <Webcam style={styles.video} mirrored={true} /> :
                <div style={styles.videoPlaceholder}>
                    Waiting to connect to motiv sensor...
                </div>
            }
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
        fontSize: '4rem',
        margin: '2rem',
        height: '6rem',
        width: '6rem',
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#d4f0ff',
        borderRadius: 20,
        border: '1px solid #4f4f4f',
    },
    videoPlaceholder: {
        zindex: 9,
        height: 360,
        width: 640,
        borderRadius: 20,
        border: '1px solid #4f4f4f',
        background: '#e0e0e0',
        color: '#4f4f4f',
        fontSize: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      video: {
        zindex: 9,
        height: 360,
        width: 640,
        borderRadius: 20,
        border: '2px solid #4f4f4f',
      },
    displayItems: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    }

  }