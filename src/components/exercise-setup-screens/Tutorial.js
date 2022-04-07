import styled from "styled-components"
import ReactPlayer from "react-player/youtube"
import { Link } from "react-router-dom"
import NextButton from "../shared/NextButton"
import { useEffect } from "react"

export default function Tutorial() {
    let exerciseName = "Standing Hamstring Curl"
    let exerciseUrl = "https://youtu.be/oWu8RxtWdGE?t=5"


    useEffect(() => {
        // exerciseName = ""

        // if(exerciseName === "Seated Knee Extension"){
        //     exerciseUrl = "https://www.youtube.com/watch?v=VuJZ6dqMf8M"
        // }

    }, [])

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
                <div style={{fontSize: '3rem', fontWeight: 500}}>{exerciseName}</div>
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
            <Link to="/exercise" style={{ textDecoration: 'none' }}>
                <NextButton>
                    ➔ Next
                </NextButton>
            </Link>
        </Container>
    )
}