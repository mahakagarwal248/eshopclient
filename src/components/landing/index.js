import React from 'react';
import Navbar from '../general/navbar';
import Background from './background';
import Products from "./products";

const index = () => {
    return (
        <div>
            <Navbar />
            <Background />
            <Products />
        </div>
    )
}

export default index;
