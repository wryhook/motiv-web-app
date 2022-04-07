export default function PairingInstructions() {
    return(
        <div style={styles.container}>
            <ol>
                <li>Strap the motiv sensor onto your ankle, facing outwards.</li>
                <li>Turn on the motiv sensor, and click connect to sensor.</li>
                <li>Get into the camera's frame and <span style={{fontWeight: 600, textDecoration: "underline"}}>keep your leg straight </span>while the sensor calibrates.</li>
                <li>Wait for 5 seconds, then start the exercise.</li>
            </ol>
        </div>
    )
}

const styles = {
    container: {
        width: 800,
        borderRadius: 20,
        border: '1px solid #4f4f4f',
        background: '#d4f0ff',
        color: '#4f4f4f',
        fontSize: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '3rem',
        padding: '3rem',
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
    }
}