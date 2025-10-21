import React, { useState, useEffect } from 'react';
import { Container, Toolbar, Button, Typography, Box, Grid, Paper, List, ListItem, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaPlus, FaSearch, FaPaperPlane, FaClock, FaFlask, FaCheck, FaPlusCircle, FaChartBar, FaList, FaEye, FaEdit, FaBolt } from 'react-icons/fa';

const Dashboard = () => {
    const navigate = useNavigate();
    const [recentRequests, setRecentRequests] = useState([]);

    useEffect(() => {
        // Simulate data fetching
        fetch('/api/recent-requests')
            .then(response => response.json())
            .then(data => setRecentRequests(data))
            .catch(error => console.error('Error fetching recent requests:', error));
    }, []);

    const handleNewRequest = () => {
        navigate('/request-form');
    };

    const handleTrackRequests = () => {
        navigate('/tracking');
    };

    const handleViewRequest = (id) => {
        navigate(`/view-request?id=${id}`);
    };

    const handleEditRequest = (id, status) => {
        if (status === 'SUBMITTED') {
            navigate(`/edit-request?id=${id}`);
        }
    };

    return (
        <Container sx={{ padding: 2, overflowY: 'auto' }}>
            <Toolbar sx={{ mb: 2 }}>
                <Typography variant="h5" flex={1}>
                    <FaTachometerAlt /> Dashboard
                </Typography>
                <Button variant="contained" color="primary" onClick={handleNewRequest} startIcon={<FaPlus />}>
                    New Request
                </Button>
                <Button variant="contained" color="secondary" onClick={handleTrackRequests} startIcon={<FaSearch />}>
                    Track Requests
                </Button>
            </Toolbar>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={3}>
                    <Paper sx={styles.card}>
                        <FaPaperPlane size={48} style={{ color: '#3498db' }} />
                        <Typography variant="h6">0</Typography>
                        <Typography>Total Requests</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper sx={styles.card}>
                        <FaClock size={48} style={{ color: '#f39c12' }} />
                        <Typography variant="h6">0</Typography>
                        <Typography>Pending Approval</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper sx={styles.card}>
                        <FaFlask size={48} style={{ color: '#9b59b6' }} />
                        <Typography variant="h6">0</Typography>
                        <Typography>In Synthesis</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper sx={styles.card}>
                        <FaCheck size={48} style={{ color: '#27ae60' }} />
                        <Typography variant="h6">0</Typography>
                        <Typography>Completed</Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Paper sx={{ mb: 2, p: 2 }}>
                <Typography variant="h6">
                    <FaList /> Recent Requests
                </Typography>
                {recentRequests.length === 0 ? (
                    <Typography>No requests found. <a href="/request-form">Submit your first request</a></Typography>
                ) : (
                    <List>
                        {recentRequests.map(request => (
                            <ListItem key={request.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <ListItemText
                                    primary={request.compoundName}
                                    secondary={
                                        <Typography>
                                            <span className={`priority-${request.priorityLevel.toLowerCase()}`}>{request.priorityLevel}</span> |
                                            <span className={`status-${request.status.toLowerCase()}`}>{request.status}</span> |
                                            {new Date(request.requestDate).toLocaleDateString()}
                                        </Typography>
                                    }
                                />
                                <ListItemIcon>
                                    <IconButton onClick={() => handleViewRequest(request.id)} color="primary">
                                        <FaEye />
                                    </IconButton>
                                    <IconButton onClick={() => handleEditRequest(request.id, request.status)} color="secondary">
                                        <FaEdit />
                                    </IconButton>
                                </ListItemIcon>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Paper>
            <Paper sx={{ p: 2 }}>
                <Typography variant="h6">
                    <FaBolt /> Quick Actions
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} md={3}>
                        <Box sx={styles.quickAction} onClick={() => navigate('/request-form')}>
                            <FaPlusCircle size={48} />
                            <Typography variant="h6">New Request</Typography>
                            <Typography>Submit a new compound synthesis request</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Box sx={styles.quickAction} onClick={() => navigate('/tracking')}>
                            <FaSearch size={48} />
                            <Typography variant="h6">Track Progress</Typography>
                            <Typography>Monitor your request status and progress</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Box sx={styles.quickAction} onClick={() => navigate('/reports')}>
                            <FaChartBar size={48} />
                            <Typography variant="h6">View Reports</Typography>
                            <Typography>Access synthesis reports and analytics</Typography>
                        </Box>
                    </Grid>
                </Grid>


            </Paper>
        </Container>
    );
};

const styles = {
    card: {
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        textAlign: 'center',
        background: '#f8f9fa',
        padding: 2,
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    quickAction: {
        backgroundColor: '#f5f7fa',
        textAlign: 'center',
        padding: 3,
        borderRadius: 2,
        cursor: 'pointer',
        height: '70%',
        boxShadow: 1,
        minHeight: '100px',
        maxWidth: '200px',
        margin: 'auto',
        transition: '0.3s',
        '&:hover': {
            boxShadow: 4,
        },
    }

};

export default Dashboard;