import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { fetchNotifications, markNotificationRead } from "../api/notificationApi"; // Example API calls

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const fetchedNotifications = await fetchNotifications();
        setNotifications(fetchedNotifications);
      } catch (err) {
        setError("Failed to load notifications.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
      setSuccessMessage("Notification marked as read.");
      setOpenSnackbar(true);
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 3,
        mt: 4,
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
        Notifications
      </Typography>
      <List>
        {notifications.map((notif) => (
          <ListItem
            key={notif.id}
            sx={{
              backgroundColor: notif.read ? "#f5f5f5" : "#e0f7fa",
              mb: 1,
              borderRadius: "4px",
            }}
            secondaryAction={
              !notif.read && (
                <Button
                  variant="text"
                  onClick={() => handleMarkAsRead(notif.id)}
                  color="primary"
                >
                  Mark as Read
                </Button>
              )
            }
          >
            <ListItemText
              primary={notif.title}
              secondary={notif.message}
              sx={{ textDecoration: notif.read ? "line-through" : "none" }}
            />
          </ListItem>
        ))}
      </List>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NotificationsPanel;