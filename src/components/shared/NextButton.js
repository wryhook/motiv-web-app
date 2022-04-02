import styled from "styled-components"

export default function NextButton(props) {
    const Container = styled.div`
        padding: 0.5rem;
        padding-right: 1.5rem;
        padding-left: 1.5rem;
        font-size: 1.75rem;
        background: #5693B6;
        color: #ffffff;
        border: 1px solid #4f4f4f;
        border-radius: 2rem;
        width: fit-content;
        font-weight: 400;
        margin: auto;
        margin-top: 1rem;

        &:hover {
            cursor: pointer;
            background: #7BB1CF;
        }
    `
    
    return(
        <Container>
            {props.children}
        </Container>
    )
}