import styled from "styled-components" //connects to database to store just-completed workout 

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

        &:hover {
            cursor: pointer;
            background: #abd4eb;
        }
    `

    const Time = styled.div`
        font-size: 1.25rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        margin-top: 1rem;
    `
    const ExercisesContainer = styled.div`
        font-size: 1.25rem;
        display: flex;
        flex-direction: column;
        margin-top: 2rem;
    `
    
    const ExerciseList = styled.div`
        display: flex;
        margin-top: 1rem;
        justify-content: space-between;
    `
    
    const ExerciseIcon = styled.div`
        height: 5rem;
        width: 5rem;
        background: white;
        border: 1px solid grey;
        border-radius: 0.5rem;
    `

    return(
        <>
            <Body>
                Today's Session
                <Time>
                    <svg xmlns="http://www.w3.org/2000/svg" style={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div style={{paddingLeft: 7}}>
                        10 mins
                    </div>
                </Time>
                <ExercisesContainer>
                    Exercises
                    <ExerciseList>
                        <ExerciseIcon />
                        <ExerciseIcon />
                        <ExerciseIcon />
                        <ExerciseIcon />
                    </ExerciseList>
                </ExercisesContainer>
            </Body>
        </>
    )
}

const styles = {
    icon: {height: 25, width: 25, color: "#4f4f4f"}
}