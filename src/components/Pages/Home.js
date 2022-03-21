import styled from "styled-components";
import Sidebar from "../Sidebar";
import TodaysSessionCard from "./TodaysSessionCard";
import { NavLink } from "react-router-dom";

export default function Home() {
    const Main = styled.div`
        margin: 2rem;
        color: #4f4f4f;
        
    `;
    const Greeting = styled.div`
        font-size: 5rem;
        margin-bottom: 5rem;
    `;
    const Container = styled.div`
        display: flex;
        flex-direction: row;
        color: palevioletred;
    `;
    
    return(
        <Container>
            <Sidebar />
            <Main>
                <Greeting>
                    Good Evening, <span style={{fontWeight: 600}}>Abdullah</span>
                </Greeting>
                <li><NavLink to= "/todaysSession">
                    <button variant="outlined">
                        Today's Session
                    </button>
                </NavLink></li>
            </Main>
        </Container>
    )
}
