import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";

const RequestForm = () => {
  const [formData, setFormData] = useState({
    type: "",
    company: "",
    message: "",
    startDate: "",
    endDate: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // logia za pošiljanje podatkov na strežnik

    setSuccessMessage("Request submitted successfully!");
    setOpenSnackbar(true);
    setFormData({
      type: "",
      company: "",
      message: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Request Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          label="Type"
          name="type"
          fullWidth
          margin="normal"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <MenuItem value="annual">Annual Leave</MenuItem>
          <MenuItem value="sick">Sick Leave</MenuItem>
          <MenuItem value="personal">Personal Leave</MenuItem>
        </TextField>
        <TextField
          label="Company"
          name="company"
          fullWidth
          margin="normal"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <TextField
          label="Message"
          name="message"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={formData.message}
          onChange={handleChange}
        />
        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          fullWidth
          margin="normal"
          value={formData.startDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="End Date"
          name="endDate"
          type="date"
          fullWidth
          margin="normal"
          value={formData.endDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit Request
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RequestForm;
