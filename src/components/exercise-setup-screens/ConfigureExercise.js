import styled from "styled-components"
import { useState, useEffect } from "react"
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
    margin-top: 4rem;
`
const RepsInput = styled.input`
    width: 4rem;
    border: none;
    background: none;
    border-bottom: 2px solid #4f4f4f;
    color: #4f4f4f;
    text-align: center;
    padding: 1rem;
    font-size: 3rem;
    font-weight: 400;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    margin-top: 1rem;
    margin-bottom: 1rem;

    &:focus {
        outline: none;
        border-bottom: 2px solid #217bad;
    }
    `
const ButtonContainer = styled.div`
    display: flex;
    margin-top: 2rem;
`

export default function ConfigureLeg({leg, handleClickLeft, handleClickRight}) {
    const LeftLegButton = styled.button`
        width: 8rem;
        height: 4rem;
        padding: 0.25rem;
        padding-right: 0.5rem;
        padding-left: 0.5rem;
        font-size: 2rem;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        background: ${leg === "Left" ? "#56b679" : "#5693B6"};
        color: #ffffff;
        border: 1px solid #4f4f4f;
        border-radius: 2rem;
        font-weight: 400;
        margin: 1rem;

        &:hover {
            cursor: pointer;
            background: ${leg === "Left" ? "#56b679" : "#7BB1CF"};
        }
    `
    const RightLegButton = styled.button`
        width: 8rem;
        height: 4rem;
        padding: 0.25rem;
        padding-right: 0.5rem;
        padding-left: 0.5rem;
        font-size: 2rem;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        background: ${leg === "Right" ? "#56b679" : "#5693B6"};
        color: #ffffff;
        border: 1px solid #4f4f4f;
        border-radius: 2rem;
        font-weight: 400;
        margin: 1rem;

        &:hover {
            cursor: pointer;
            background: ${leg === "Right" ? "#56b679" : "#7BB1CF"};
        }
    `
    
    return (
        <Container>
            <SelectionMessage>
                Select which leg you'd like to use
            </SelectionMessage>
            <ButtonContainer>
                    <LeftLegButton onClick={handleClickLeft}>
                        Left
                    </LeftLegButton>
                    <RightLegButton onClick={handleClickRight}>
                        Right
                    </RightLegButton>
            </ButtonContainer>
        </Container>
    )
}