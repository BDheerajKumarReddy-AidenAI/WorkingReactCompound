import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import './HeaderView.css'; // Assuming you have a CSS file for styles
import logo from './AidenAI_Logo.svg'
const HeaderView = ({ heading }) => {
    const navigate = useNavigate();

    const onProfileClick = () => {
        // Handle profile click
        console.log('Profile clicked');
    };

    const onNotificationsClick = () => {
        // Handle notifications click
        console.log('Notifications clicked');
    };

    const onSettingsClick = () => {
        // Handle settings click
        console.log('Settings clicked');
    };

    return (
        <AppBar position="static" className="headerview" sx={{ minHeight: 60, padding: '16px 24px' }}>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    <img
                        src={logo} // <-- replace with your image path
                        alt="Aiden AI"
                        style={{ height: 40, marginRight: 10 }}
                    />
                    <Typography className="headerviewtext" style={{ display: 'flex', alignItems: 'center', paddingLeft: '10px', fontFamily: '\'Poppins\', sans-serif', color: '#ffffff' }}>
                        {heading}
                    </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        color="inherit"
                        aria-label="home"
                        onClick={() => navigate('/homeview')}
                        style={{ margin: '0 18px' }}
                    >
                        <HomeIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        aria-label="profile"
                        onClick={onProfileClick}
                        style={{ margin: '0 18px' }}
                    >
                        <PersonIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        aria-label="notifications"
                        onClick={onNotificationsClick}
                        style={{ margin: '0 18px' }}
                    >
                        <NotificationsIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        aria-label="settings"
                        onClick={onSettingsClick}
                        style={{ margin: '0 18px' }}
                    >
                        <SettingsIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderView;