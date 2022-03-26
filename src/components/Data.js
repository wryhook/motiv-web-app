import React, { useState } from 'react';
import Setup from './Setup';
import BluetoothSetup from './BluetoothSetup';
import { ThemeConsumer } from 'styled-components';

export default function Data() { //parent component compares CV and IMU angles to ensure correctness of IMU, then counts reps
    //could use polling to check for new angle values then compare? or combine setups in 1 component?
    
    const [CVdata, setCVData] = useState(Number);
    const [IMUdata, setIMUData] = useState(Number);
    let errorcounter = 0;
  
    const CVToData = (CV_angle) => {
        setCVData(CV_angle);
    }
  
    const IMUToData = (IMU_angle) => {
        setIMUData(IMU_angle);
    }    

    /* setInterval(() => {
    CompareAngle();
    }, 500) */

    //CVdata.onchange = console.log("We got a reading")
    //IMUdata.onchange = CompareAngle();

    /* function CompareAngle() { //compare the angle values
        //console.log("We got a reading")
        if (IMUdata > CVdata + 10 || IMUdata < CVdata - 10) {
            console.log("Re-Calibrate Device");
            errorcounter++;
            if (errorcounter > 5  ) { //if repeated errors in certain timeframe, break cycle
               
            } 
        }
    } */
    
    return (
        <div className='App'>
            {CVdata}
                <div className='setup'> 
                    <Setup CVToData={CVToData}/>
                </div>
            {IMUdata}
                <div>
                    <BluetoothSetup IMUToData={IMUToData}/>
                </div>
        </div>
    );                  
}