import { useState } from "react"
import styled from "styled-components"
import ExerciseCard from "../ExerciseCard"
import { useNavigate } from "react-router-dom"
import ConfigureLeg from "./ConfigureExercise"
import ConfigureReps from "./ConfigureReps"
import ConfigureTarget from "./ConfigureTarget"

const Container = styled.div`
    margin: auto;
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
    const [targetAngle, setTargetAngle] = useState(50)

    let navigate = useNavigate()
    console.log(targetAngle)
    
    let name = 'User'
    if(props.name){
        name = props.name
    }

    function navigateToTutorial() {
        console.log(`Exercise: ${exercise}`)
        console.log(`Leg: {leg}`)
        console.log(`Reps: ${targetReps}`)
        
        if(exercise == "HC"){
            navigate("/tutorial")
        }
    }


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
                target={targetAngle}
                updateTarget={target => setTargetAngle(target)}
            />
            <StartButton onClick={navigateToTutorial}>
                Start Exercise
            </StartButton>
        </Container>
    )
}