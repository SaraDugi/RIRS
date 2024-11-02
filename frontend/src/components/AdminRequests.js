import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    List,
    ListItem,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import { getAllGroupedRequests, updateRequestStatus } from '../api/requestApi';

const AdminRequests = () => {
    const [requests, setRequests] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllGroupedRequests();
                setRequests(response);
            } catch (error) {
                console.error('Error fetching leave requests:', error);
            }
        };

        fetchData();
    }, []);
    const handleOpen = (request) => {
        setSelectedRequest(request);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedRequest(null);
    };

    const handleStatusChange = async (event, request) => {

    };

    return (              
            <Container>
                <Typography variant="h4" gutterBottom>
                    Leave Requests
                </Typography>
                <List style={{ maxHeight: "70vh", overflowY: 'auto' }}>
                    {requests.map((request) => (
                        <ListItem key={request.email}>
                            <div style={{ flex: 1 }}>
                                <Typography variant="body2">
                                    Email: {request.email}
                                </Typography>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ flex: 1 }}>
                                        <Typography variant="body2">
                                            Date: {new Date(request.datum_zahteve).toLocaleDateString()}
                                        </Typography>
                                        <Typography variant="body2">
                                            Comment: {request.komentar}
                                        </Typography>
                                    </div>

                                </div>
                            </div>
                            <Button variant="outlined" onClick={() => handleOpen(request)}>
                                Details
                            </Button>
                            <div style={{ marginLeft: '16px', marginTop: '8px' }}>
                                        <FormControl variant="outlined" margin="dense" style={{ minWidth: 120 }}>
                                            <InputLabel id={`status-label-${request.id}`}>Status</InputLabel>
                                            <Select
                                                labelId={`status-label-${request.id}`}
                                                value={request.stanje.toLowerCase()}
                                                onChange={(event) => handleStatusChange(event, request)}
                                                label="Status"
                                            >
                                                <MenuItem value="accepted">Accepted</MenuItem>
                                                <MenuItem value="denied">Denied</MenuItem>
                                                <MenuItem value="in progress">In Progress</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                        </ListItem>
                    ))}
                </List>
    
                <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                    <DialogTitle>Leave Request Details</DialogTitle>
                    <DialogContent>
                        {selectedRequest && (
                            <div>
                                <Typography variant="h6">Request Details:</Typography>
                                <Typography variant="body2">
                                    Date: {new Date(selectedRequest.datum_zahteve).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2">Status: {selectedRequest.stanje}</Typography>
                                <Typography variant="body2">Comment: {selectedRequest.komentar}</Typography>
                                <Typography variant="h6" style={{ marginTop: '16px' }}>Leave Details:</Typography>
                                {selectedRequest.dopusti.map((leave, index) => (
                                    <div key={index}>
                                        <Typography variant="body2">
                                            Leave Type: {leave.tip_dopusta}
                                        </Typography>
                                        <Typography variant="body2">
                                            Start Date: {leave.zacetek}
                                        </Typography>
                                        <Typography variant="body2">
                                            End Date: {leave.konec}
                                        </Typography>
                                        <Typography variant="body2">
                                            Reason: {leave.razlog}
                                        </Typography>
                                        <Typography variant="body2" style={{ marginBottom: '1rem' }}>
                                            --------------------
                                        </Typography>
                                    </div>
                                ))}
                            </div>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
    );
};

export default AdminRequests;
