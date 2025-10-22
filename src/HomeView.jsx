import React from 'react';
import { Box, Typography, Button, Card, CardContent, Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
//import 'relative/path/to/style.scss'; // Assuming there is an external stylesheet
import './HomeView.css'; // Assuming you have a CSS file for styles
import { FaPaperPlane, FaSearch, FaShieldAlt, FaUsers } from 'react-icons/fa';

const HomeView = () => {
    const navigate = useNavigate();

    const handleCardClick = (message) => {
        alert(message);
    };

    return (
        <Box className="home-view" sx={{ padding: 3, overflowY: 'auto' }}>
            <Typography variant="h5" className="main-heading" gutterBottom>
                Start Exploring our Innovations
            </Typography>
            <Box className="highlight-card" sx={{ display: 'flex', padding: '24px 30px', margin: '0 0 30px 0', height: 80 }}>
                <Box flex={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <Typography variant="h6" className="highlight-title">
                        Welcome to the Compound Synthesis Request Management System
                    </Typography>
                    <Typography variant="body1" className="highlight-desc">
                        Streamline your pharmaceutical research with our comprehensive compound synthesis request platform.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        className="btn-primary"
                        size="medium"
                        sx={{ marginLeft: 3 }}
                        onClick={() => navigate('/request-form')}
                    >
                        Get Started →
                    </Button>
                </Box>
            </Box>
            {/* <Grid container
                spacing={3}
                wrap="nowrap" // 🔹 prevents wrapping to next line
                sx={{
                    overflowX: 'auto', // 🔹 enables horizontal scroll if needed
                    flexWrap: 'nowrap', // optional redundancy for clarity
                    justifyContent: 'flex-start', // align left (or 'center')
                }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card className="feature-card" sx={{ width: 160, height: 90, margin: 1.5, padding: 2, cursor: 'pointer' }} onClick={() => handleCardClick('Submit Requests clicked!')}>
                        <CardContent>
                            <IconButton>
                                <FaPaperPlane />
                            </IconButton>
                            <Typography sx={{
                                fontSize: '14px',
                                fontWeight: 300,
                                mb: 0.25, // minimal bottom spacing
                            }}>Submit Requests</Typography>
                            <Typography sx={{
                                fontSize: '8px',
                                fontWeight: 80,
                                lineHeight: 1.4,
                                color: '#666',
                            }}>
                                Submit detailed compound synthesis requests with automated validation and pre-screening.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card className="feature-card" sx={{ width: 160, height: 90, margin: 1.5, padding: 2, cursor: 'pointer' }} onClick={() => handleCardClick('Track Progress clicked!')}>
                        <CardContent>
                            <IconButton>
                                <FaSearch />
                            </IconButton>
                            <Typography variant="h7">Track Progress</Typography>
                            <Typography variant="body2">
                                Monitor your requests in real-time through our comprehensive tracking system.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card className="feature-card" sx={{ width: 160, height: 90, margin: 1.5, padding: 2, cursor: 'pointer' }} onClick={() => handleCardClick('Compliance clicked!')}>
                        <CardContent>
                            <IconButton>
                                <FaShieldAlt />
                            </IconButton>
                            <Typography variant="h7">Compliance</Typography>
                            <Typography variant="body2">
                                Automated compliance checks for controlled substances and regulatory requirements.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card className="feature-card" sx={{ width: 160, height: 90, margin: 1.5, padding: 2, cursor: 'pointer' }} onClick={() => handleCardClick('Collaboration clicked!')}>
                        <CardContent>
                            <IconButton>
                                <FaUsers />
                            </IconButton>
                            <Typography variant="h7">Collaboration</Typography>
                            <Typography variant="body2">
                                Seamless workflow between discovery scientists, supervisors, and synthesis teams.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid> */}
            <Grid
                container
                spacing={2}
                wrap="nowrap"
                sx={{
                    overflowX: 'auto',
                    flexWrap: 'nowrap',
                    justifyContent: 'flex-start',
                    padding: 1,
                }}
            >
                {[ // Wrap all your card data into an array for cleaner code, or repeat manually if needed
                    {
                        icon: <FaPaperPlane />,
                        title: 'Submit Requests',
                        desc: 'Submit detailed compound synthesis requests with automated validation and pre-screening.',
                        onClick: () => handleCardClick('Submit Requests clicked!')
                    },
                    {
                        icon: <FaSearch />,
                        title: 'Track Progress',
                        desc: 'Monitor your requests in real-time through our comprehensive tracking system.',
                        onClick: () => handleCardClick('Track Progress clicked!')
                    },
                    {
                        icon: <FaShieldAlt />,
                        title: 'Compliance',
                        desc: 'Automated compliance checks for controlled substances and regulatory requirements.',
                        onClick: () => handleCardClick('Compliance clicked!')
                    },
                    {
                        icon: <FaUsers />,
                        title: 'Collaboration',
                        desc: 'Seamless workflow between discovery scientists, supervisors, and synthesis teams.',
                        onClick: () => handleCardClick('Collaboration clicked!')
                    }
                ].map((item, index) => (
                    <Grid item key={index} sx={{ minWidth: 200 }}>
                        <Card
                            className="feature-card"
                            sx={{
                                height: 150,
                                padding: 2,
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: 3,
                                borderRadius: 2,
                                transition: '0.3s',
                                '&:hover': {
                                    boxShadow: 6,
                                    transform: 'translateY(-2px)'
                                }
                            }}
                            onClick={item.onClick}
                        >
                            <CardContent sx={{ p: 0 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <IconButton color="primary" size="small">
                                        {item.icon}
                                    </IconButton>
                                    <Typography sx={{ fontSize: '14px', fontWeight: 600, ml: 1 }}>
                                        {item.title}
                                    </Typography>
                                </Box>
                                <Typography
                                    sx={{
                                        fontSize: '11px',
                                        fontWeight: 400,
                                        color: '#666',
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {item.desc}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </Box>
    );
};

export default HomeView;