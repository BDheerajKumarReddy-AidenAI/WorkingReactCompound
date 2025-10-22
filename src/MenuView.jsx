import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Collapse, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import FileIcon from '@mui/icons-material/FileCopy';
import ChartLineIcon from '@mui/icons-material/ShowChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import './MenuView.css'; // Assuming you have a CSS file for styles
const MenuView = () => {
    const [navCollapsed, setNavCollapsed] = useState(false);
    const [openItems, setOpenItems] = useState({});
    const navigate = useNavigate();

    const menuData = {
        expanded: true,
        children: [
            {
                text: 'Home',
                iconCls: 'x-fa fa-home',
                xtype: 'homeview',
                leaf: true
            },
            {
                text: 'Request Form',
                iconCls: 'x-fa fa-file-alt',
                xtype: 'request-form',
                leaf: true
            },
            {
                text: 'Tracking Panel',
                iconCls: 'x-fa fa-chart-line',
                xtype: 'tracking',
                leaf: true
            },
            {
                text: 'Dashboard',
                iconCls: 'x-fa fa-chart-pie',
                xtype: 'dashboard',
                leaf: true
            },
            {
                text: 'TechD',
                iconCls: 'x-fa fa-chart-pie',
                xtype: 'dashboard',
                leaf: true
            },
            {
                text: 'TX',
                iconCls: 'x-fa fa-chart-pie',
                xtype: 'dashboard',
                leaf: true
            }
        ]
    };

    const handleToggle = (index) => {
        setOpenItems({
            ...openItems,
            [index]: !openItems[index]
        });
    };

    const handleItemClick = (xtype) => {
        navigate(`/${xtype}`);
    };

    const renderIcon = (iconCls) => {
        switch (iconCls) {
            case 'x-fa fa-home':
                return <HomeIcon />;
            case 'x-fa fa-file-alt':
                return <FileIcon />;
            case 'x-fa fa-chart-line':
                return <ChartLineIcon />;
            case 'x-fa fa-chart-pie':
                return <PieChartIcon />;
            default:
                return null;
        }
    };

    const renderMenuItems = (items, parentIndex = '') => {
        return items.map((item, index) => {
            const itemIndex = `${parentIndex}-${index}`;
            return (
                <div key={itemIndex}>
                    <ListItem button onClick={() => item.leaf ? handleItemClick(item.xtype) : handleToggle(itemIndex)}>
                        <ListItemIcon>
                            {renderIcon(item.iconCls)}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                        {!item.leaf && (openItems[itemIndex] ? <ExpandLess /> : <ExpandMore />)}
                    </ListItem>
                    {!item.leaf && (
                        <Collapse in={openItems[itemIndex]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {renderMenuItems(item.children, itemIndex)}
                            </List>
                        </Collapse>
                    )}
                </div>
            );
        });
    };

    return (
        <List component="nav" aria-labelledby="nested-list-subheader" className={navCollapsed ? 'collapsed' : ''}>
            {renderMenuItems(menuData.children)}
        </List>
    );
};

export default MenuView;