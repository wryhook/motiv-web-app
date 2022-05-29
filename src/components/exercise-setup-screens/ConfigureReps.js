import styled from "styled-components"
import { Link } from "react-router-dom"

const Container = styled.div`
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    background-color: #d4f0ff;
`
const SelectionMessage = styled.div`
    font-size: 2rem;
    font-weight: 400;
    color: #4f4f4f;
    margin-top: 3rem;
`
const StartButton = styled.button`
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
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        margin-top: 1rem;

        &:hover {
            cursor: pointer;
            background: #7BB1CF;
        }
    `
const RepsInput = styled.input`
    width: 4rem;
    border: none;
    background: none;
    border-bottom: 2px solid #4f4f4f;
    color: #4f4f4f;
    text-align: center;
    padding: 0.5rem;
    font-size: 4rem;
    font-weight: 400;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    margin-top: 1rem;

    &:focus {
        outline: none;
        border-bottom: 2px solid #217bad;
    }
    `


export default function ConfigureReps({ reps, updateReps }) {
    
    return(
        <Container>
            <SelectionMessage>
                Enter the number of repetitions
                <div style={{fontSize: '1.25rem', textAlign: 'center', marginTop: '0.5rem'}}>Recommended: 3-7</div>
            </SelectionMessage>
            <form>
                <div>
                    <RepsInput 
                        id="reps"
                        name="reps"
                        type="text"
                        onChange={e => updateReps(e.target.value)}
                        value={reps}
                    />
                </div>
            </form>
        </Container>
    )
}