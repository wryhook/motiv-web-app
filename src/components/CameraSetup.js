import { useState, useEffect, useCallback } from "react";
import styled from "styled-components"
import AngleVisualizer from "./AngleVisualizer";
import PoseEstimation from "./PoseEstimation";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"

const Body = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: auto;
    min-height: 100vh;
    background-color: #d4f0ff;
`
const InfoBar = styled.div`
    height: 6rem;
    font-size: 2.5rem;
`
const AngleVisualizerPlaceholder = styled.div`
    margin-top: 1rem;
    margin-bottom: 2rem;
    border: 1px solid #4f4f4f;
    border-radius: 15px;
    background: #d1d1d1;
    height: 2rem;
    width: 36rem;
`
const InfoBarMessage = styled.div`
    background: #fadfc5;
    padding: 1rem;
    padding-left: 2rem;
    padding-right: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #4f4f4f;
    border-radius: 15px;
`
const EndSessionButton = styled.button`
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

export default function CameraSetup() {
    const [inPosition, setInPosition] = useState(false)
    const [rightLegChosen, setRightLegChosen] = useState(true)
    const [angle, setAngle] = useState(0)
    const [reps, setReps] = useState(0)
    const [repMaxes, setRepMaxes] = useState([])
    const [targetReps, setTargetReps] = useState(6)
    const [targetAngle, setTargetAngle] = useState(60)
    const [endSession, setEndSession] = useState(false)

    let navigate = useNavigate()

    const getData = async() => {
        const docRef = doc(db, "sessions", "Session 1");  
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            //display session data in html components (each session must have same data format)
            setTargetReps(docSnap.get('targetReps'))
            setTargetAngle(docSnap.get('userThreshold'))
            if (docSnap.get('right')==='Right'){
                setRightLegChosen(true)
            }
            if (docSnap.get('leg')==='Left'){
                setRightLegChosen(false)
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
        if(repMaxes.length >= targetReps){
            setEndSession(true)
            setData()
        }

    }, [repMaxes])

    const updateInPosition = useCallback((arg) => {
        setInPosition(arg)
    }, [setInPosition])

    const updateAngle = useCallback((arg) => {
        setAngle(arg)
    }, [setAngle])

    const updateReps = useCallback(() => {
        setReps(prevReps => prevReps + 1)
    }, [setReps])

    const updateRepMaxes = useCallback((repMaxes) => {
        setRepMaxes(repMaxes)
    }, [setRepMaxes])

    return (
        <Body>
            <InfoBar>
                {
                    inPosition ?
                    <div>Reps Completed: {repMaxes.length}</div> :
                    <InfoBarMessage>Move your entire body into frame</InfoBarMessage>
                }
            </InfoBar>
            {
                inPosition ?
                <AngleVisualizer angle={angle} targetAngle={targetAngle}/> : 
                <AngleVisualizerPlaceholder />

            }
            {
                endSession ?
                <EndSessionButton onClick={() => navigate("/ending-screen")}>End Session</EndSessionButton> :
                <PoseEstimation 
                    updateInPosition={updateInPosition}
                    updateAngle={updateAngle}
                    updateReps={updateReps}
                    updateRepMaxes={updateRepMaxes}
                    rightLegChosen={rightLegChosen}
                    targetAngle = {targetAngle}
                />
            }
        </Body>
    )
}