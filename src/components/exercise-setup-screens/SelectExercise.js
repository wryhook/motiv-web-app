import { useState, useEffect } from "react"
import styled from "styled-components"
import ExerciseCard from "../ExerciseCard"
import { useNavigate } from "react-router-dom"
import ConfigureLeg from "./ConfigureExercise"
import ConfigureReps from "./ConfigureReps"
import ConfigureTarget from "./ConfigureTarget"
import {db} from "../../firebase"
import { getDoc, setDoc, doc, runTransaction } from "firebase/firestore"
import { setDeprecationWarningFn } from "@tensorflow/tfjs-core/dist/tensor"

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    background-color: #d4f0ff;
    overflow: scroll;
`
const Greeting = styled.div`
    font-size: 3.5rem;
    font-weight: 500;
    color: #4f4f4f;
    margin-top: 4rem;
`
const SelectionMessage = styled.div`
    font-size: 2rem;
    font-weight: 400;
    color: #4f4f4f;
    margin-top: 3rem;
`
const ExercisesContainer = styled.div`
    display: flex;
    margin-top: 2rem;
`
const StartButton = styled.button`
    padding: 0.25rem;
    padding: 1.5rem;
    padding-right: 2.5rem;
    padding-left: 2.5rem;
    font-size: 3rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    background: #5693B6;
    color: #ffffff;
    border: 1px solid #4f4f4f;
    border-radius: 2rem;
    font-weight: 400;
    margin-top: 3rem;
    margin-bottom: 4rem;


    &:hover {
        cursor: pointer;
        background: #7BB1CF
    }
`

let hamstringCurlUrl = "https://www.marattmd.com/learn/images/rehab/HamstringCurl2Export.jpg"
let kneeExtensionUrl = "https://www.marattmd.com/learn/images/rehab/SeatedKneeExtension2.jpg"

export default function SelectExercise(props) {
    const [leg, setLeg] = useState("")
    const [exercise, setExercise] = useState("")
    const [targetReps, setTargetReps] = useState(5)
    const [threshold, setTargetAngle] = useState(50)
    const [name, getName] = useState("")

    let navigate = useNavigate()
    console.log(threshold)
    
    //let name = 'User'
    if(props.name){
        name = props.name
    }

    function navigateToTutorial() {
        console.log(`Exercise: ${exercise}`)
        console.log(`Leg: {leg}`)
        console.log(`Reps: ${targetReps}`)
        
        setData();
        navigate("/tutorial")
    }

    const getData = async() => {
       
        const docRef = doc(db, "sessions", "Session 1");  
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Name:", docSnap.data("userName"));
            //display session data in html components (each session must have same data format)
            
            getName(docSnap.get('userName'))

            }  
        else {
            console.log("How bro!"); // doc.data() will be undefined in this case
        }
    }

    const setData = async() => {
        try {
            const sessionRef = await setDoc(doc(db, "sessions", "Session 1"), {
                leg: leg,
                exercise: exercise,
                targetReps: targetReps,
                userThreshold: threshold
            }, {merge: true});
            console.log("Document written w/ name: ", sessionRef.id);
        } catch (e) {
            console.error("Error adding/writing to document: ", e);
        }
    }

    useEffect(() => {//might not need to be here
        getData();
    });   

    return(
        <Container>
            <Greeting>Good Afternoon, {name}</Greeting>
            <SelectionMessage>Select the exercise you'd like to peform</SelectionMessage>
            
            <ExercisesContainer>
                <div onClick={() => setExercise("HC")}>
                    <ExerciseCard name={"Hamstring Curl"} url={hamstringCurlUrl} selected={exercise === "HC"}/>
                </div>
                <div onClick={() => setExercise("KE")}>
                    <ExerciseCard name={"Knee Extension"} url={kneeExtensionUrl} selected={exercise === "KE"}/>
                </div>
            </ExercisesContainer>
            <ConfigureLeg 
                handleClickLeft={() => setLeg("Left")} 
                handleClickRight={() => setLeg("Right")}
                leg={leg}
            />
            <ConfigureReps 
                reps={targetReps}
                updateReps={reps => setTargetReps(reps)}
            />
            <ConfigureTarget 
                target={threshold}
                updateTarget={target => setTargetAngle(target)}
            />
            <StartButton onClick={navigateToTutorial}>
                Start Exercise
            </StartButton>
        </Container>
    )
}