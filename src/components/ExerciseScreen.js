import styled from "styled-components"
import { useState, useEffect } from "react"
import { useCallback } from "react"
import PoseEstimation from "./PoseEstimation"
import BluetoothSetup from "./BluetoothSetup"
import PairingInstructions from "./PairingInstructions"
import AngleVisualizer from "./AngleVisualizer"
import Webcam from 'react-webcam';
import { useNavigate } from "react-router-dom"

const StartButton = styled.button`
        padding: 0.75rem;
        padding-right: 1.75rem;
        padding-left: 1.75rem;
        font-size: 2rem;
        background: #5693B6;
        color: #ffffff;
        border: 1px solid #4f4f4f;
        border-radius: 2rem;
        width: fit-content;
        font-weight: 400;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        margin-top: 1rem;

        &:hover {
            cursor: pointer;
            background: #7BB1CF;
        }
    `

export default function ExerciseScreen() {
    const [angle, setAngle] = useState(0)
    const [bluetoothReps, setBluetoothReps] = useState(0)
    const [reps, setReps] = useState(0)
    const [isConnected, setIsConnected] = useState(false)
    const [repMaxes, setRepMaxes] = useState([])
    const [endSession, setEndSession] = useState(false)


    let recievedThreshold = 50 //REMEMBER TO CHANGE THIS
    let targetReps = 3

    let navigate = useNavigate()

    useEffect(() => {
        if(reps >= targetReps){
            setEndSession(true)
        }
    }, [reps])

    function handleEndSession() {
        console.log("ending session")
        console.log(repMaxes)
        navigate("/ending-screen")
    }

    const setBluetoothStatusTrue = () => {
        setIsConnected(true)
    }

    const updateRepMaxes = useCallback((repMaxes) => {
        setRepMaxes(repMaxes)
    }, [setAngle])
    
    const updateReps = useCallback(() => {
        setReps(prevReps => prevReps + 1)
    }, [setReps])

    const updateAngle = useCallback((recievedAngle) => {
        setAngle(recievedAngle)
    }, [setAngle])

    const incrementBluetoothReps = useCallback((bluetoothReps) => {
        setReps(prevReps => prevReps + 1)
    }, [setBluetoothReps])


    return (
        <div style={styles.container}>
            {
                endSession &&
                <StartButton onClick={handleEndSession}>
                    End Session
                </StartButton>
            }
            {
                isConnected ?
                <div style={styles.displayItems}>
                    <div style={styles.repsDisplay}>
                        {reps}
                    </div>
                    
                </div> :
                <PairingInstructions />
            }
            <BluetoothSetup 
                updateReps={incrementBluetoothReps}
                setBluetoothStatusTrue={setBluetoothStatusTrue}
                updateAngle={updateAngle}
                updateRepMaxes={updateRepMaxes}
                flipAngle={false}
                threshold={recievedThreshold}
            />
            <AngleVisualizer angle={angle} threshold={recievedThreshold}/>
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