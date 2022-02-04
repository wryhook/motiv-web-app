import styled from "styled-components"

export default function TodaysSessionCard() {
    const Body = styled.div`
        height: 15rem;
        width: 25rem;
        background: #d4f0ff;
        color: #4f4f4f;
        border: 1px solid #4f4f4f;
        border-radius: 2rem;
        padding: 1.5rem;
        font-size: 2rem;
        font-weight: 600;
    `

    return(
        <>
            <Body>
                Today's Session
            </Body>
        </>
    )
}