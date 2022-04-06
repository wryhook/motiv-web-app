import styledComponents from "styled-components";
import { History } from "history";
import firebase from "../../firebase";
import sessionButton from "./SessionCard";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
//Display all data from selected previous session by calling to database

const SessionHistory = async() => {
    const querySnapshot = await getDocs(collection(firebase.db, "sessions"));
    querySnapshot.forEach((doc) => {
    console.log(`${doc.id}`);
    //map all previous sessions names to array, these become Title for each SessionCard 
    
    });

    return( //create "card" for each session document currently in database when loaded, it acts as link to history for that session 
            <Body>
                Previous Sessions
                <Time>
                    <div style={{paddingLeft: 7}}>
                        10 mins
                    </div>
                </Time>
                <SessionContainer style={style.container}>
                        <Title>
                            Session, <span style={{fontWeight: 600}}>1</span> {/*To update for each new session*/}
                        </Title>
                        <Link to="/history" style={{ textDecoration: 'none' }}>
                            <SessionCard />
                        </Link>
                </SessionContainer>
            </Body>
      )
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: '',
        flexDirection: '',
        width: '',
    },
    Title: {
        fontSize: '3rem',
        marginBottom: '3rem',
    }
}

