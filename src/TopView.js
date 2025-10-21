import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
// import Logo from './Logo'; // Assuming Logo component is implemented
import './TopView.css'; // Assuming you have a CSS file for styles
const TopView = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [navCollapsed, setNavCollapsed] = useState(false);

    const handleNavToggle = () => {
        setNavCollapsed(!navCollapsed);
    };

    return (
        <AppBar position="static" className="topview" elevation={0} style={{ height: 80, padding: '10px 20px' }}>
            <Toolbar
                style={{
                    display: navCollapsed ? 'flex-direction: column' : 'flex-direction: row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box>
                    {/* <Logo
                        src={navCollapsed ? "resources/images/AidenAI_Short.svg" : "resources/images/AidenAI_Logo.svg"}
                        height={40}
                        width={170}
                    /> */}
                </Box>
                <Box>
                    <IconButton
                        className="nav-toggle-btn"
                        onClick={handleNavToggle}
                        color="inherit"
                        aria-label="toggle navigation"
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopView;