import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import TodaysSessionCard from './Pages/TodaysSessionCard';

const Main = () => {
    return (
        <Routes> 
            <Route path='/' element={Home}></Route>
            <Route path='/todaysSession' element={TodaysSessionCard}></Route>
        </Routes>
    );
}

export default Main;