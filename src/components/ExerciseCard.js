import styled from "styled-components"

const NameText = styled.div`
    font-size: 1.25rem;
    font-weight: 500;
    text-align: center;
    padding: 0.75rem;
`

export default function ExerciseCard(props) {
    const Container = styled.div`
        border: 1px solid #4f4f4f;
        border-radius: 2rem;
        background: ${props.selected ? "#27AE60" : "#5693B6"};
        color: #ffffff;
        margin-right: 1.5rem;
        margin-left: 1.5rem;

        &:hover {
            cursor: pointer;
            background: ${props.selected ? "#27AE60" : "#7BB1CF"};
        }
    `
    
    return(
        <Container>
            <img src={props.url} style={image} />
            <NameText>
                {props.name}
            </NameText>
        </Container>
    )
}

const image = {
    width: 250,
    borderRadius: "2rem 2rem 0 0"
}