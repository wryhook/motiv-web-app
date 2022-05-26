
import React, { useState, useEffect } from "react"

function MiddleBlock(props) {
    const block = {
        height: '2rem',
        width: '7rem',
        border: '1px solid #4f4f4f',
        background: props.isFilled ? '#56b679' : '#ffffff'
    }

    return(
        <div style={block}></div>
    )
}

function ThresholdBlock(props) {
    const block = {
        height: '2rem',
        width: '7rem',
        border: '1px solid #4f4f4f',
        borderRight: '3px solid #FF2E2E',
        background: props.isFilled ? '#56b679' : '#ffffff'
    }

    return(
        <div style={block}></div>
    )
}

function StartBlock(props) {
    const block = {
        height: '2rem',
        width: '7rem',
        border: '1px solid #4f4f4f',
        borderRadius: '15px 0px 0px 15px',
        background: props.isFilled ? '#56b679' : '#ffffff'
    }

    return(
        <div style={block}></div>
    )
}

function EndBlock(props) {
    const block = {
        height: '2rem',
        width: '7rem',
        border: '1px solid #4f4f4f',
        borderLeft: '3px solid #FF2E2E',
        borderRadius: '0px 15px 15px 0px',
        background: props.isFilled ? '#56b679' : '#ffffff'
    }

    return(
        <div style={block}></div>
    )
}

const AngleVisualizer = React.memo((props) => {
    let TARGET_ANGLE = props.targetAngle
    const [isFilledArray, setIsFilledArray] = useState([false, false, false, false, false])
    console.log("rendered")
    useEffect(() => { //based on inputted threshold?
        if (props.angle < 5){
            setIsFilledArray([false, false, false, false, false])
        }
        if (props.angle > TARGET_ANGLE * 0.25){
            setIsFilledArray([true, false, false, false, false])
        }
        if (props.angle > TARGET_ANGLE * 0.5){
            setIsFilledArray([true, true, false, false, false])
        }
        if (props.angle > TARGET_ANGLE * 0.75){
            setIsFilledArray([true, true, true, false, false])
        }
        if (props.angle > TARGET_ANGLE){
            setIsFilledArray([true, true, true, true, false])
        }
        if (props.angle > TARGET_ANGLE * 1.25){
            setIsFilledArray([true, true, true, true, true])
        }
    }, [props.angle])

    const container = {
        display: 'flex',
        marginTop: '1rem',
        marginBottom: '2rem',
    }

    
    return(
        <div style={container}>
            <StartBlock isFilled={isFilledArray[0]}/>
            <MiddleBlock isFilled={isFilledArray[1]}/>
            <MiddleBlock isFilled={isFilledArray[2]}/>
            <ThresholdBlock isFilled={isFilledArray[3]}/>
            <EndBlock isFilled={isFilledArray[4]}/>
        </div>
    )
})

export default AngleVisualizer