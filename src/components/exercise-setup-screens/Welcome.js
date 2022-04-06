import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import styled from "styled-components"
import NextButton from "../shared/NextButton"
import {db} from "../../firebase"
import { setDoc, getDocs, doc, collection, query, where } from "firebase/firestore"

const NameInput = styled.input`
    border: none;
    background: none;
    border-bottom: 2px solid #4f4f4f;
    color: #4f4f4f;
    text-align: center;
    padding: 1rem;
    font-size: 3rem;
    font-weight: 300;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    margin-top: 1rem;
    margin-bottom: 1rem;

    &:focus {
        outline: none;
        border-bottom: 2px solid #217bad;
    }
    `
const Container = styled.div`
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    background-color: #d4f0ff;
`
const WelcomeMessage = styled.div`
    font-size: 4rem;
    font-weight: 600;
    color: #4f4f4f;
`
const GetStarted = styled.div`
    font-size: 2.5rem;
    font-weight: 300;
    color: #4f4f4f;
    margin-top: 5rem;
`
const StartButton = styled.button`
        padding: 0.75rem;
        padding-right: 1.75rem;
        padding-left: 1.75rem;
        font-size: 2rem;
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
const SessionHistory = styled(StartButton)`
    background: #B3D6EA;
    color: #4f4f4f;
    font-size: 1.25rem;
    margin-top: 4rem;
    
    &:hover {
        background: #A0CAE1;
    }
`

export default function Welcome(props) {
    const [name, setName] = useState("")

    let navigate = useNavigate()

    function handleClick() {
        console.log(name)
        navigate("/select-exercise")
    }

    //To put into new component:
    let exists = false;
    const userRef = collection(db, "users");

    const q = query(userRef, where("name", "==", name))//if doesnt work, change database to sessions collection outside of user collection
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        exists = true;
    });

    //if name exists, write to next session in that user document
    //if not exists, create new document w/ user's name and then create new session inside that
    try {
        const sessionRef = await setDoc(doc(db, "sessions", ), {
            userName: name,
        });
        console.log("Document written w/ name", docRef.id);
    } catch (e) {
        console.error("Error adding/writing to document: ", e);
    }       
    //End

    return(
        <Container>
            <WelcomeMessage>
                Welcome to the motiv booth!
            </WelcomeMessage>
            <GetStarted>
                To get started, enter your name below
            </GetStarted>
            <form>
                <div>
                    <NameInput 
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name"
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                </div>
            </form>
            <StartButton onClick={handleClick}>
                Get Started
            </StartButton>
            <SessionHistory>
                Past Sessions
            </SessionHistory>
        </Container>
    )
}