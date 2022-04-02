import styledComponents from "styled-components";
import { History } from "history";
import firebase from "./utils/firebase";
//Display all data from selected previous session by calling to database

const SessionHistory = async() => {
    const querySnapshot = await getDocs(collection(db, "sessions"));
    querySnapshot.forEach((doc) => {
    console.log(`${doc.id}`);
    //show all previous sessions
    
    });

    /* return (
        <div style= {styles.container}>
            <div style= {styles.}>

            </div>
        </div>
    )    */
}

/* const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: '',
        flexDirection: '',
        width: '',
    },
    : {
        fontSize: '4rem'

    }
} */