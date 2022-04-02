import styled from "styled-components";
import Sidebar from "./Sidebar";
import TodaysSessionCard from "./TodaysSessionCard";
import { Link } from "react-router-dom";


export default function Home() {
    const Main = styled.div`
        margin: 2rem;
        margin-left: 3rem;
        color: #4f4f4f;
        
    `
    const Greeting = styled.div`
        font-size: 3rem;
        margin-bottom: 3rem;
    `
    const Container = styled.div`
        display: flex;
        flex-direction: row;
    `
    
    return(
        <Container>
            <Sidebar />
            <Main>
                <Greeting>
                    Good Evening, <span style={{fontWeight: 600}}>IGEN 430</span>
                </Greeting>
                <Link to="/tutorial" style={{ textDecoration: 'none' }}>
                    <TodaysSessionCard />
                </Link>
            </Main>
        </Container>
    )
}