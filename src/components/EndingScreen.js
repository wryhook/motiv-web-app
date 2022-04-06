import { useEffect, useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const BodyContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100vw;
    background: #DCF2CA;
`
const Reps = styled.div`
    padding: 0.5rem;
    padding-right: 1rem;
    padding-left: 1rem;
    font-size: 3rem;
    color: #4f4f4f;
    border: 1px solid #4f4f4f;
    border-radius: 1.25rem;
    font-weight: 400;
    margin: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
`
const UnsuccessfulReps = styled(Reps)`
    background: #FFDCBB;
`
const SuccessfulReps = styled(Reps)`
    background: #BFE89D;
`
const SuccessRate = styled(Reps)`
    background: #d4f0ff;
`
const LabelText = styled.div`
    font-size: 1.5rem;
    color: #4f4f4f;
`
const RepsTitle = styled.div`
    font-size: 3.5rem;
    font-weight: 600;
    color: #4f4f4f;
    margin-right: 3rem;
`
const RepsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-left: 1rem;
    margin-right: 1rem;
`
const SRContainer = styled(RepsContainer)`
    margin-left: 3rem;
`
const SummaryStats = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
`
const ChartContainer = styled.div`
    width: 50rem;
    height: 20rem;
    background: grey;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1.5rem;
`
const Title = styled.div`
    font-size: 3.5rem;
    color: #4f4f4f;
    text-align: center;
    margin-bottom: 3rem;
    margin-top: 3rem;
`
const HomeButton = styled.div`
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
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3rem;

    &:hover {
        cursor: pointer;
        background: #7BB1CF;
    }
`


export default function EndingScreen() {
    let repMaximas = [61, 60, 54, 58, 69, 70]
    let threshold = 50
    let name = "Abdullah"
    const [sReps, setSReps] = useState(0)
    const [uReps, setUReps] = useState(0)
    const [successRate, setSuccessRate] = useState(0)
    const [onTarget, setOnTarget] = useState(false)
    const [succeeding, setSucceeding] = useState(false)
    const [failing, setFailing] = useState(false)

    // let successRatePercent = Math.round(sReps / (sReps + uReps) * 100)

    // let averageMaxima = repMaximas.reduce((a, b) => a + b, 0)

    // if(successRatePercent > 90 && averageMaxima > threshold + 10) {
    //     setSucceeding(true)
    //     setOnTarget(false)
    //     setFailing(false)
    // }

    // if(averageMaxima < threshold - 10) {
    //     setSucceeding(false)
    //     setOnTarget(false)
    //     setFailing(true)
    // }

    useEffect(() => {
        let s = 0
        let u = 0
        let average = repMaximas.reduce((a, b) => a + b, 0)

        for (let i=0; i < repMaximas.length; i++) {
            if(repMaximas[i] < threshold){
                u++
            }
            else {
                s++
            }
        }

        let sr = Math.round(s / (s + u) * 100)

        if(average > threshold + 10 && sr > 90) {
            setSucceeding(true)
            setFailing(false)
            setOnTarget(false)
        }
        else if(average < threshold - 10) {
            setSucceeding(false)
            setFailing(true)
            setOnTarget(false)
        }
        else {
            setSucceeding(false)
            setFailing(false)
            setOnTarget(true)
        }

        setSuccessRate(sr)
        setSReps(s)
        setUReps(u)
    }, [])

    
    return(
        <BodyContainer>
            <Title>
                Here's how you did today, {name}
            </Title>
            <ChartContainer>
                Chart goes here
            </ChartContainer>
            <SummaryStats>
                <RepsTitle>
                    Reps
                </RepsTitle>
                <RepsContainer>
                    <LabelText>
                        Successful
                    </LabelText>
                    <SuccessfulReps>
                        {sReps}
                    </SuccessfulReps>
                </RepsContainer>
                
                <RepsContainer>
                    <LabelText>
                        Unsuccessful
                    </LabelText>
                    <UnsuccessfulReps>
                        {uReps}
                    </UnsuccessfulReps>
                </RepsContainer>
                <SRContainer>
                    <LabelText>
                        Success Rate
                    </LabelText>
                    <SuccessRate>
                        {successRate}%
                    </SuccessRate>
                </SRContainer>
            </SummaryStats>
            {
                succeeding && <Succeeding />
            }
            {
                failing && <Failing />
            }
            {
                onTarget && <OnTarget />
            }
            <Link to="/" style={{textDecoration: 'none'}}>
                <HomeButton>Back to Home</HomeButton>
            </Link>
        </BodyContainer>
    )
}

const RecommendationContainer = styled.div`
    width: 50rem;
    border-radius: 20px;
    border: 1px solid #4f4f4f;
    background: #DCF2CA;
    color: #4f4f4f;
    padding: 2rem;
    font-size: 1.25rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2rem;
`
const Recommendation = styled.div`
    font-size: 1.75rem;
    font-weight: 500;
    margin-bottom: 1rem;
`

function OnTarget() {
    return(
        <RecommendationContainer>
            <Recommendation>
                Recommendation
            </Recommendation>
            Great job today. We recommend <span style={{fontWeight: 600}}>sticking to this target </span> 
            for a few more sessions until you feel more comfortable, before moving higher. Remember to always 
            consult your physiotherapist.
        </RecommendationContainer>
    )
}

function Succeeding() {
    return(
        <RecommendationContainer>
            <Recommendation>
                Recommendation
            </Recommendation>
            Your performance was excellent today. We recommend you talk to your physiotherapist about <span style={{fontWeight: 600}}>increasing your target by 10 degrees </span> 
            for the next time you perform this exercise. 
        </RecommendationContainer>
    )
}

function Failing() {
    return(
        <RecommendationContainer>
            <Recommendation>
                Recommendation
            </Recommendation>
            Great job as always! Seemed like you struggled a little today. We recommend you talk to your physiotherapist about <span style={{fontWeight: 600}}>decreasingh your target by 10 degrees </span> 
            until you're more comfortable at that level.
        </RecommendationContainer>
    )
}