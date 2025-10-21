import React, { useState, useEffect } from 'react';
import { Box, Toolbar, Button, TextField, Select, MenuItem, Grid, Typography, Paper, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
//import 'relative/path/to/style.scss'; // Assuming there is an external style sheet

const TrackingPanel = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [dateFromFilter, setDateFromFilter] = useState('');
    const [dateToFilter, setDateToFilter] = useState('');
    const [requests, setRequests] = useState([]);
    const [requestCount, setRequestCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isFirstPage, setIsFirstPage] = useState(true);
    const [isLastPage, setIsLastPage] = useState(false);

    useEffect(() => {
        // Simulate data fetching
        fetchRequests();
    }, [currentPage, statusFilter, priorityFilter, dateFromFilter, dateToFilter]);

    const fetchRequests = async () => {
        // Simulate API call
        const response = await fetch(`/api/requests?page=${currentPage}&status=${statusFilter}&priority=${priorityFilter}&dateFrom=${dateFromFilter}&dateTo=${dateToFilter}`);
        const data = await response.json();
        setRequests(data.requests);
        setRequestCount(data.requestCount);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setIsFirstPage(data.currentPage === 1);
        setIsLastPage(data.currentPage === data.totalPages);
    };

    const handleSearchTap = () => {
        setCurrentPage(1);
        fetchRequests();
    };

    const handleClearFiltersTap = () => {
        setSearchText('');
        setStatusFilter('');
        setPriorityFilter('');
        setDateFromFilter('');
        setDateToFilter('');
        setCurrentPage(1);
        fetchRequests();
    };

    const handlePreviousPage = () => {
        if (!isFirstPage) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (!isLastPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleDashboardTap = () => {
        navigate('/dashboard');
    };

    const handleNewRequestTap = () => {
        navigate('/request-form');
    };

    const handleViewRequest = (id) => {
        navigate(`/request/${id}`);
    };

    const handleDetailsRequest = (id) => {
        navigate(`/request/${id}/details`);
    };

    const columns = [
        { field: 'id', headerName: 'Request ID', width: 100, renderCell: (params) => <strong>{params.value}</strong> },
        { field: 'compoundName', headerName: 'Compound Name', flex: 1 },
        { field: 'priorityLevel', headerName: 'Priority', width: 100, renderCell: (params) => <span className={`priority-badge priority-${params.value}`}>{params.value}</span> },
        { field: 'status', headerName: 'Status', width: 120, renderCell: (params) => <span className={`status-badge status-${params.value.toLowerCase().replace('_', '-')}`}>{params.row.statusDisplay}</span> },
        { field: 'progressPercentage', headerName: 'Progress', width: 150, renderCell: (params) => (
            <div className="progress-container">
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${params.value}%` }}></div></div>
                <small>{params.value}%</small>
            </div>
        ) },
        { field: 'requestDate', headerName: 'Submitted', width: 120, valueFormatter: (params) => new Date(params.value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
        { field: 'timelineRequired', headerName: 'Timeline', width: 120, valueFormatter: (params) => new Date(params.value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
        { field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => (
            <Box>
                <Tooltip title="View">
                    <IconButton onClick={() => handleViewRequest(params.row.id)}>
                        <i className="x-fa fa-eye"></i>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Details">
                    <IconButton onClick={() => handleDetailsRequest(params.row.id)}>
                        <i className="x-fa fa-info-circle"></i>
                    </IconButton>
                </Tooltip>
            </Box>
        ) }
    ];

    return (
        <Box sx={{ padding: 2, overflowY: 'auto', height: '100vh' }}>
            <Toolbar variant="dense" sx={{ backgroundColor: '#f5f5f5' }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <i className="fas fa-search"></i> Track Requests
                </Typography>
                <Button onClick={handleDashboardTap} startIcon={<i className="x-fa fa-tachometer-alt"></i>}>
                    Dashboard
                </Button>
                <Button onClick={handleNewRequestTap} startIcon={<i className="x-fa fa-plus"></i>}>
                    request-form
                </Button>
            </Toolbar>
            <Paper elevation={3} sx={{ margin: '10px 0', padding: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        label="Search by Request ID, Compound Name, or Status..."
                        variant="outlined"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        sx={{ flex: 1, marginRight: 2 }}
                    />
                    <Button onClick={handleSearchTap} startIcon={<i className="fas fa-search"></i>}>
                        Search
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                    <Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        displayEmpty
                        variant="outlined"
                        sx={{ marginRight: 2 }}
                    >
                        <MenuItem value="">
                            <em>All Statuses</em>
                        </MenuItem>
                        <MenuItem value="submitted">Submitted</MenuItem>
                        <MenuItem value="pre-screening">Pre-screening</MenuItem>
                        <MenuItem value="supervisor-review">Supervisor Review</MenuItem>
                        <MenuItem value="approved">Approved</MenuItem>
                        <MenuItem value="assigned">Assigned</MenuItem>
                        <MenuItem value="in-synthesis">In Synthesis</MenuItem>
                        <MenuItem value="quality-check">Quality Check</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                    <Select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        displayEmpty
                        variant="outlined"
                        sx={{ marginRight: 2 }}
                    >
                        <MenuItem value="">
                            <em>All Priorities</em>
                        </MenuItem>
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                    </Select>
                    <TextField
                        label="From Date"
                        type="date"
                        variant="outlined"
                        value={dateFromFilter}
                        onChange={(e) => setDateFromFilter(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginRight: 2 }}
                    />
                    <TextField
                        label="To Date"
                        type="date"
                        variant="outlined"
                        value={dateToFilter}
                        onChange={(e) => setDateToFilter(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginRight: 2 }}
                    />
                    <Button onClick={handleClearFiltersTap} startIcon={<i className="fas fa-times"></i>}>
                        Clear
                    </Button>
                </Box>
            </Paper>
            <Paper elevation={3} sx={{ flex: 1, margin: '10px 0', padding: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">
                        Your Requests
                    </Typography>
                    <Typography>
                        {requestCount} requests found
                    </Typography>
                </Box>
                <DataGrid
                    rows={requests}
                    columns={columns}
                    autoHeight
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    sx={{ marginTop: 2 }}
                />
                <Toolbar variant="dense" sx={{ backgroundColor: '#f5f5f5', justifyContent: 'center', marginTop: 2 }}>
                    <Button onClick={handlePreviousPage} disabled={isFirstPage} startIcon={<i className="fas fa-chevron-left"></i>}>
                        Previous
                    </Button>
                    <Typography sx={{ margin: '0 10px' }}>
                        Page {currentPage} of {totalPages}
                    </Typography>
                    <Button onClick={handleNextPage} disabled={isLastPage} endIcon={<i className="fas fa-chevron-right"></i>}>
                        Next
                    </Button>
                </Toolbar>
            </Paper>
        </Box>
    );
};

export default TrackingPanel;