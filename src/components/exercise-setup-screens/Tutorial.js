import styled from "styled-components"
import ReactPlayer from "react-player/youtube"
import { Link } from "react-router-dom"
import NextButton from "../shared/NextButton"

export default function Tutorial() {

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
        height: 480px;
        width: 852px;
        background-color: #d4f0ff;
    `
    
    return (
        <Container>
            <Text>
                Next Exercise 
                <div style={{fontSize: '3rem', fontWeight: 500}}>Standing Hamstring Curl</div>
            </Text>
            <VideoContainer>
                <ReactPlayer 
                    url='https://www.youtube.com/watch?v=Fadu_1dGVbE'
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