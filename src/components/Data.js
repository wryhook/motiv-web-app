import React, { useState } from 'react';
import Setup from './Setup';
import BluetoothSetup from './BluetoothSetup';
import { ThemeConsumer } from 'styled-components';

export default function Data() { //parent component compares CV and IMU angles to ensure correctness of IMU, then counts reps
    //easiest to use polling to check for new angle values then compare
    
    const [CVdata, setCVData] = useState('');
    const [IMUdata, setIMUData] = useState('');
    let errorcounter = 0;
  
    const CVToData = (CV_angle) => {
        setCVData(CV_angle);
    }
  
    const IMUToData = (IMU_angle) => {
        setIMUData(IMU_angle);
    }    

    .onchange = console.log("Compare dis")
    .onchange = CompareAngle();

    function CompareAngle() { //compare the angle values

        if (IMUdata > CVdata + 10 || IMUdata < CVdata - 10) {
            console.log("Re-Calibrate Device");
            errorcounter++;
            if (errorcounter > 5  ) { //if repeated errors in certain timeframe, break cycle
               
            } 
        }
    }
    
    return (
        <div>
            <BluetoothSetup IMUToData={IMUToData}/>
            <Setup CVToData={CVToData}/>
        </div>
    );                  
}