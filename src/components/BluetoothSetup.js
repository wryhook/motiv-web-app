function BluetoothSetup() {

  function handleClick() {
    navigator.bluetooth.requestDevice({ filters: [{ 
      services: ['battery_service'] 
    }] })
    .then(device => device.gatt.connect())
    .then(server => {
      // Getting Battery Service…
      return server.getPrimaryService('battery_service');
    })
    .then(service => {
      // Getting Battery Level Characteristic…
      return service.getCharacteristic('battery_level');
    })
    .then(characteristic => {
      // Reading Battery Level…
      return characteristic.readValue();
    })
    .then(value => {
      console.log(`Battery percentage is ${value.getUint8(0)}`);
    })
    .catch(error => { console.error(error); });
  }

  return (
    <div>
      <div style={styles.button} onClick={handleClick}>Connect to Bluetooth</div>
    </div>
  );
}

export default BluetoothSetup;

const styles = {
    button: {
        height: '6rem',
        width: '24rem',
        backgroundColor: '#a3dfff',
        borderRadius: 20,
        border: '2px solid #4f4f4f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#4f4f4f',
        fontSize: '2rem',
        fontWeight: '600',
        cursor: 'pointer',
    }
}