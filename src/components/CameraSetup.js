import { useState, useCallback } from "react";
import styled from "styled-components"

import PoseEstimation from "./PoseEstimation";


const Body = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: auto;
    min-height: 100vh;
    background-color: #d4f0ff;
`

export default function CameraSetup() {
    const [inPosition, setInPosition] = useState(false)

    function CheckPosition() {
        setInPosition(true)
    }

    return (
        <Body>
            {
                inPosition ?
                <div>You're in position</div> :
                <div>Move into position</div>
            }
            <div>this another div</div>
            <PoseEstimation/>
        </Body>
    )
}