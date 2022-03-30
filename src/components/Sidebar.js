import styled from "styled-components"
import SidebarButton from "./SidebarButton"

export default function Sidebar() {
    const Body = styled.div`
        height: 100vh;
        width: 6rem;
        border-right: 1px solid grey;
    `
    
    return (
        <>
            <Body>
                <SidebarButton>
                    <svg xmlns="http://www.w3.org/2000/svg" style={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Home
                </SidebarButton>
                <SidebarButton>
                    <svg xmlns="http://www.w3.org/2000/svg" style={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Progress
                </SidebarButton>
                <SidebarButton>
                    <svg xmlns="http://www.w3.org/2000/svg" style={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                </SidebarButton>
            </Body>
        </>
    )
}

const styles = {
    icon: {height: 40, width: 40, color: "#4f4f4f"}
}