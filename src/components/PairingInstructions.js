export default function PairingInstructions() {
    return(
        <div style={styles.container}>
            <ol>
                <li>Turn on the motiv sensor and wait until ...</li>
                <li>Wait for this light to flash...</li>
                <li>Click the button below to connect</li>
            </ol>
        </div>
    )
}

const styles = {
    container: {
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