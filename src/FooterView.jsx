import React from 'react';
import { Toolbar, Typography } from '@mui/material';
import './FooterView.css'; // Assuming you have a CSS file for styles

const FooterView = () => {
    return (
        <Toolbar className="footerview" sx={{ minHeight: 60 }}>
            <Typography className="footerviewtext">
                © 2025 AidenAI. All Rights Reserved.
            </Typography>
        </Toolbar>
    );
};

export default FooterView;