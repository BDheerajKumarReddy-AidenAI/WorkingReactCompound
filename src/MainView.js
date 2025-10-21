import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavView from './NavView';
import HeaderView from './HeaderView';
import FooterView from './FooterView';
import CenterView from './CenterView';
import './MainView.css'; // Assuming you have a CSS file for styles

const MainView = () => {
    const [navViewWidth, setNavViewWidth] = useState(200); // Reduced from 240px to 200px
    const [headerViewHeight, setHeaderViewHeight] = useState(48); // Reduced from 64px to 48px
    const [footerViewHeight, setFooterViewHeight] = useState(36); // Reduced from 48px to 36px
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate fetching data from a REST API or local state
        const fetchData = async () => {
            try {
                const response = await fetch('/api/viewmodel');
                const data = await response.json();
                setNavViewWidth(data.navview_width || 200); // Fallback to 200px
                setHeaderViewHeight(data.headerview_height || 48); // Fallback to 48px
                setFooterViewHeight(data.footerview_height || 36); // Fallback to 36px
            } catch (error) {
                console.error('Failed to fetch viewmodel data:', error);
            }
        };

        fetchData();
    }, []);

    const handleMenuViewSelectionChange = (event, item) => {
        // Handle menu selection change
        if (item.path) {
            navigate(item.path);
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: navViewWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: navViewWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <NavView
                    width={navViewWidth}
                    onSelect={handleMenuViewSelectionChange}
                />
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: `calc(100% - ${navViewWidth}px)`,
                }}
            >
                <AppBar
                    position="fixed"
                    sx={{
                        width: `calc(100% - ${navViewWidth}px)`,
                        ml: `${navViewWidth}px`,
                        height: headerViewHeight,
                    }}
                >
                    <Toolbar sx={{ minHeight: headerViewHeight, height: headerViewHeight }}>
                        <HeaderView height={headerViewHeight} />
                    </Toolbar>
                </AppBar>
                <Toolbar sx={{ minHeight: headerViewHeight }} />
                <CenterView />
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        width: `calc(100% - ${navViewWidth}px)`,
                        ml: `${navViewWidth}px`,
                        height: footerViewHeight,
                    }}
                >
                    {/* <FooterView height={footerViewHeight} /> */}
                </Box>
            </Box>
        </Box>
    );
};

export default MainView;