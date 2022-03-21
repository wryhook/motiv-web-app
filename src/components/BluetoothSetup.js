import { any } from "@tensorflow/tfjs-core";

function BluetoothSetup() {

  function handleClick() {
    console.log("HandleClick ran")
    navigator.bluetooth.requestDevice({ filters: [{ 
      name: ['Motiv Sensor'] 
    }],
    optionalServices: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b'] // Required to access service later.
    })
    .then(device => device.gatt.connect())
    .then(server => {
      // Getting Battery Service…
      return server.getPrimaryService('4fafc201-1fb5-459e-8fcc-c5c9c331914b');
    })
    .then(service => {
      // Getting Battery Level Characteristic…
      return Promise.all([
        service.getCharacteristic('beb5483e-36e1-4688-b7f5-ea07361b26a8')
          .then(handleBatteryLevelCharacteristic)
      ])
    })
  }

  function handleBatteryLevelCharacteristic(characteristic) {
    setInterval(() => {
      //console.log("handleBatterylevel ran")
      return characteristic.readValue()
      .then(value => {
        let angle = value.getUint8(0); 
        if(angle > 255/2){  //getting signed angles from unsigned int value
            angle = angle - 255; 
        }
        console.log(`Angle: ${angle}`);
      })
    }, 500)
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