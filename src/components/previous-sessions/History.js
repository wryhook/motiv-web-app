/* import styled from "styled-components";
import {db} from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
//Displays all previous sessions in cards on screen, clicking on card goes to  for that session calling values from databae

let sessionName = "test"; //value passed from SessionHistory when SessionCard clicked

const History = async() => {
  
  const docRef = doc(db, "sessions", sessionName);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      //display session data in html components (each session must have same data format)

    } else {
      console.log("This session hasn't happened yet!"); // doc.data() will be undefined in this case
  }

  docSnap();

  return( //display & graph data for the appropriate session that was selected 
    <>
        <Body>
            Session 
            <Time>
                <div style={{paddingLeft: 7}}>
                    
                </div>
            </Time>
            <GraphContainer>

            </GraphContainer>
        </Body>
    </>
  )

};

export default History;

const styles = {
icon: {height: 25, width: 25, color: "#4f4f4f"}
} */