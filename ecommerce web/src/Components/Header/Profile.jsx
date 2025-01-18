import React from 'react';
import { Box, Avatar, Typography, Menu, MenuItem } from '@mui/material';

const Profile = ({ account, setAccount }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAccount(null); // Clear account state
        handleMenuClose();
    };

    return (
        <Box>
            <Avatar onClick={handleMenuClick} style={{ cursor: 'pointer' }}>
                {account[0].toUpperCase()}
            </Avatar>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </Box>
    );
};

export default Profile;
