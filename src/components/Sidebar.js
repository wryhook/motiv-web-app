import styled from "styled-components"
import SidebarButton from "../components/SidebarButton"

export default function Sidebar() {
    const Body = styled.div`
        height: 100vh;
        width: 5rem;
        border-right: 1px solid grey;
    `
    
    return (
        <>
            <Body>
                <SidebarButton>
                    Home
                </SidebarButton>
                <div>Home</div>
                <div>Progress</div>
                <div>Profile</div>
            </Body>
        </>
    )
}