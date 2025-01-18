import React from 'react';
import { Box, Typography, styled } from '@mui/material'; 
import { navData } from '../../constant/data.js';
import './NavBar.css';  // Import the CSS file

const NavBar = () => {
    return (
        <div className="navbar-component">
            {navData.map((temp, index) => (
                <div className="navbar-container" key={index}>
                    <img src={temp.url} alt={temp.text} className="navbar-img" />
                    <Typography className="navbar-text">{temp.text}</Typography>
                </div>
            ))}
        </div>
    );
}

export default NavBar;
