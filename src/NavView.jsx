import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TopView from './TopView';
import MenuView from './MenuView';
import './NavView.css'; // Assuming you have a CSS file for styles
const NavView = () => {
    const [menuviewWidth, setMenuviewWidth] = useState(260);
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate fetching data or setting initial state
        // Example: fetchMenuData().then(data => setMenuviewWidth(data.width));
    }, []);

    const handleMenuViewSelectionChange = (event, item) => {
        // Handle menu selection change
        if (item.path) {
            navigate(item.path);
        }
    };

    return (
        <Box className="navview" sx={{ width: menuviewWidth }}>
            {/* <AppBar position="static" elevation={0}>
                <Toolbar>
                    <TopView />
                </Toolbar>
            </AppBar> */}
            <Box sx={{ overflowY: 'auto', height: 'calc(100vh - 60px)' }}>
                <MenuView
                    width={menuviewWidth}
                    onSelectionChange={handleMenuViewSelectionChange}
                />
            </Box>
        </Box>
    );
};

export default NavView;