import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Drawer, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import NavView from './NavView';
import HeaderView from './HeaderView';
import FooterView from './FooterView';
import CenterView from './CenterView';
import './Layout.css';

const Layout = () => {
    return (<div className="layout-container">
        <HeaderView className="header">
        </HeaderView>
        <div className="main-content">
            <NavView />
            <div className="content-area">
                <main className='scroll'>
                    <Outlet />
                </main>
                <FooterView className="footer">
                </FooterView>
            </div>
        </div>
    </div>)
}

export default Layout;