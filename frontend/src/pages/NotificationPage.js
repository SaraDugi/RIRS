import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import { getUserRequests } from "../api/requestApi";

const NotificationPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const userRequests = await getUserRequests();
        setRequests(userRequests);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  // Categorize requests by status
  const acceptedRequests = requests.filter(
    (request) => request.stanje.toLowerCase() === "accepted"
  );
  const deniedRequests = requests.filter(
    (request) => request.stanje.toLowerCase() === "denied"
  );
  const inProgressRequests = requests.filter(
    (request) => request.stanje.toLowerCase() === "in progress"
  );

  const renderRequests = (title, requests) => (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {requests.length > 0 ? (
        <List>
          {requests.map((request) => (
            <Paper
              key={request.id}
              sx={{ mb: 2, p: 2, borderRadius: "8px", backgroundColor: "#f9f9f9" }}
            >
              <ListItem>
                <ListItemText
                  primary={`Request #${request.id} - ${request.stanje}`}
                  secondary={
                    <>
                      <Typography variant="body2">
                        Submitted on: {new Date(request.datum_zahteve).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                        Comment: {request.komentar || "No comment provided"}
                      </Typography>
                      {request.dopusti.map((leave, index) => (
                        <Box key={index} sx={{ mt: 2 }}>
                          <Typography variant="body2">
                            Leave Type: {leave.tip_dopusta}
                          </Typography>
                          <Typography variant="body2">
                            Start Date: {new Date(leave.zacetek).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2">
                            End Date: {new Date(leave.konec).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2">Reason: {leave.razlog}</Typography>
                        </Box>
                      ))}
                    </>
                  }
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      ) : (
        <Typography>No requests in this category.</Typography>
      )}
      <Divider />
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>
      {renderRequests("Accepted Requests", acceptedRequests)}
      {renderRequests("Denied Requests", deniedRequests)}
      {renderRequests("In Progress Requests", inProgressRequests)}
    </Container>
  );
};

export default NotificationPage;