import Welcome from "./exercise-setup-screens/Welcome";
import { useState } from "react"
import SelectExercise from "./exercise-setup-screens/SelectExercise";

export default function ExerciseSetup() {
    const[showWelcome, setShowWelcome] = useState(true)
    const[showSelectExercise, setShowSelectExercise] = useState(false)
    const [name, setName] = useState("")

    function updateName(nameFromForm) {
        setName(nameFromForm)
        console.log(name)
    }
    
    function navigateWtoSE() {
        setShowWelcome(false)
        setShowSelectExercise(true)
    }

    return(
        <div>
            {showWelcome && <Welcome updateName={updateName} name={name}/>}
            {showSelectExercise && <SelectExercise name={name} navigateToNext={navigateWtoSE}/>}
        </div>
    )
}