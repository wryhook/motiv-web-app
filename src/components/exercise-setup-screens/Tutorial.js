import styled from "styled-components"
import ReactPlayer from "react-player/youtube"
import { Link } from "react-router-dom"
import NextButton from "../shared/NextButton"
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase"

export default function Tutorial() {
    const [exerciseName, setExerciseName] = useState("Please choose exercise")
    const [exerciseUrl, setExerciseUrl] = useState("")

    //get the value of exercise and which leg and output video accordingly //copy from leg selector
    useEffect(() => {
        // exerciseName = ""

        const getData = async() => {
       
            const docRef = doc(db, "sessions", "Session 1");  
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                console.log("Exercise:", docSnap.data("exercise")); //display session data in html components (each session must have same data format)
                setExerciseName(docSnap.get('exercise'))
                } 
            else {
                console.log("Thxis session hasn't happened yet!"); // doc.data() will be undefined in this case
            }
        }

        getData();

        if(exerciseName === "KE"){
            setExerciseUrl("https://youtu.be/VuJZ6dqMf8M?t=5");
        } else if (exerciseName === "HC"){
            setExerciseUrl("https://youtu.be/Fadu_1dGVbE?t=7");
        }

    }, [exerciseName])

    const Container = styled.div`
        background-color: #d4f0ff;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    `

    const Text = styled.div`
        font-size: 2rem;
        color: #4f4f4f;
        text-align: center;
        margin-bottom: 2rem;
    `

    const VideoContainer = styled.div`
        height: 400px;
        width: 710px;
        background-color: #d4f0ff;
    `
    
    return (
        <Container>
            <Text>
                Next Exercise 
                <div style={{fontSize: '3rem', fontWeight: 500}}>
                    {exerciseName == "KE" ? "Seated Knee Extension" : "Standing Hamstring Curl"}
                </div>
            </Text>
            <VideoContainer>
                <ReactPlayer 
                    url={exerciseUrl}
                    width='100%'
                    height='100%' 
                    muted={true}
                    playing={true}
                />
            </VideoContainer>
            <Link to="/camera-setup" style={{ textDecoration: 'none' }}>
                <NextButton>
                    ➔ Next
                </NextButton>
            </Link>
        </Container>
    )
}