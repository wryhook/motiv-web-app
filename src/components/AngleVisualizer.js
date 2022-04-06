
import React, { useState } from "react"

const AngleVisualizer = React.memo((props) => {
    const [isFilledArray, setIsFilledArray] = useState([true, true, true, false, false])
    
    if (props.angle > 20){
        setIsFilledArray([true, false, false, false, false])
    }
    if (props.angle > 30){
        setIsFilledArray([true, true, false, false, false])
    }
    if (props.angle > 40){
        setIsFilledArray([true, true, true, false, false])
    }
    if (props.angle > 50){
        setIsFilledArray([true, true, true, true, false])
    }
    if (props.angle > 60){
        setIsFilledArray([true, true, true, true, true])
    }

    const container = {
        display: 'flex',
    }

    function MiddleBlock(props) {
        const block = {
            height: '5rem',
            width: '7rem',
            border: '1px solid #4f4f4f',
            background: props.isFilled ? '#72E45F' : '#ffffff'
        }

        return(
            <div style={block}></div>
        )
    }

    function LeftThresholdBlock(props) {
        const block = {
            height: '5rem',
            width: '7rem',
            border: '1px solid #4f4f4f',
            borderRight: '3px solid #FF2E2E',
            background: props.isFilled ? '#72E45F' : '#ffffff'
        }

        return(
            <div style={block}></div>
        )
    }

    function StartBlock(props) {
        const block = {
            height: '5rem',
            width: '7rem',
            border: '1px solid #4f4f4f',
            borderRadius: '15px 0px 0px 15px',
            background: props.isFilled ? '#72E45F' : '#ffffff'
        }

        return(
            <div style={block}></div>
        )
    }

    function EndBlock(props) {
        const block = {
            height: '5rem',
            width: '7rem',
            border: '1px solid #4f4f4f',
            borderLeft: '3px solid #FF2E2E',
            borderRadius: '0px 15px 15px 0px',
            background: props.isFilled ? '#72E45F' : '#ffffff'
        }

        return(
            <div style={block}></div>
        )
    }
    
    return(
        <div style={container}>
            <StartBlock isFilled={isFilledArray[0]}/>
            <MiddleBlock isFilled={isFilledArray[1]}/>
            <MiddleBlock isFilled={isFilledArray[2]}/>
            <LeftThresholdBlock isFilled={isFilledArray[3]}/>
            <EndBlock isFilled={isFilledArray[4]}/>
        </div>
    )
})

export default AngleVisualizer