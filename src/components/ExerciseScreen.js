import styled from "styled-components"
import { useState, useEffect, useCallback } from "react"
import BluetoothSetup from "./BluetoothSetup"
import PairingInstructions from "./PairingInstructions"
import AngleVisualizer from "./AngleVisualizer"
import Webcam from 'react-webcam';
import { useNavigate } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"
import { setDoc, collection, query, where } from "firebase/firestore"

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
    const [isConnected, setIsConnected] = useState(true)
    const [repMaxes, setRepMaxes] = useState([])
    const [endSession, setEndSession] = useState(false)
    const [receivedThreshold, getThreshold] = useState(50) //need to get these
    const [targetReps, getTargetReps] = useState(6) //need to get these
    const [shouldFlipAngle, setShouldFlipAngle] = useState(false)
    const [userName, getUserName] = useState("")
    const [leg, getLeg] = useState("")
    const [exercise, getExercise] = useState("")

    let navigate = useNavigate()

    const getData = async() => {
        const docRef = doc(db, "sessions", "Session 1");  
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            //display session data in html components (each session must have same data format)
            getTargetReps(docSnap.get('targetReps'))
            getThreshold(docSnap.get('userThreshold'))
            getUserName(docSnap.get('userName'))
            getLeg(docSnap.get('leg'))
            getExercise(docSnap.get('exercise'))
            if (docSnap.get('leg')==='Right' && docSnap.get('exercise')==='HC'){
                setShouldFlipAngle(true)
            }
            if (docSnap.get('leg')==='Left' && docSnap.get('exercise')==='KE'){
                setShouldFlipAngle(true)
            }
            } 
        else {
            console.log("This session hasn't happened yet!"); // doc.data() will be undefined in this case
        }
    }
    const setData = async() => {
        try {
            const sessionRef = await setDoc(doc(db, "sessions", "Session 1"), {
                maxAnglesIMU: repMaxes,
                }, 
                {merge:true} 
            );
            console.log("Document written w/ maximas array: ", sessionRef.id);
        } catch (e) {
            console.error("Error adding/writing to document: ", e);
        }
    }
    
    useEffect(() => {
        getData()
    })

    useEffect(() => {
        if(reps >= targetReps){
            setEndSession(true)
            setData()
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
                flipAngle={shouldFlipAngle}
                threshold={receivedThreshold}
            />
            {
                isConnected &&
                <AngleVisualizer angle={angle} threshold={receivedThreshold}/>
            }
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
        width: 480,
        borderRadius: 20,
        border: '2px solid #4f4f4f',
        background: '#e0e0e0',
        color: '#4f4f4f',
        fontSize: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      video: {
        zindex: 9,
        height: 360,
        //width: 640,
        borderRadius: 20,
        border: '1px solid #4f4f4f',
      },
    displayItems: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    }

  }