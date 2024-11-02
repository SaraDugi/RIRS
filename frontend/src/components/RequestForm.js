import React, { useState } from "react";
import { submitLeaveRequest } from "../api/requestApi";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const RequestForm = () => {
  const [dopusti, setDopusti] = useState([
    { startDate: "", endDate: "", razlog: "", tip: "" },
  ]);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleDopustChange = (index, e) => {
    const { name, value } = e.target;
    const newDopusti = [...dopusti];
    newDopusti[index][name] = value;
    setDopusti(newDopusti);
  };

  const addDopust = () => {
    setDopusti([
      ...dopusti,
      { startDate: "", endDate: "", razlog: "", tip: "" },
    ]);
  };

  const deleteDopust = (index) => {
    const newDopusti = dopusti.filter((_, i) => i !== index);
    setDopusti(newDopusti);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting request:", dopusti);

    try {
      const response = await submitLeaveRequest(dopusti);

      if (response.status === 201) {
        setSuccessMessage("Request submitted successfully!");
        setOpenSnackbar(true);
        setDopusti([{ startDate: "", endDate: "", razlog: "", tip: "" }]);
      }
    } catch (error) {
      setSuccessMessage("Failed to submit request");
      setOpenSnackbar(true);
    }
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
        Leave Request Form
      </Typography>
      <form onSubmit={handleSubmit}>
        {dopusti.map((dopust, index) => (
          <Box
            key={index}
            sx={{
              mb: 2,
              border: "1px solid #ddd",
              p: 2,
              borderRadius: "8px",
              position: "relative",
            }}
          >
            <IconButton
              sx={{
                position: "absolute",
                top: 2,
                right: 2,
                color: "red",
                padding: "5px",
                fontSize: "16px",
              }}
              onClick={() => deleteDopust(index)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>

            <TextField
              label="Reason"
              name="razlog"
              fullWidth
              margin="normal"
              value={dopust.razlog}
              onChange={(e) => handleDopustChange(index, e)}
            />
            <TextField
              select
              label="Leave Type"
              name="tip"
              fullWidth
              margin="normal"
              value={dopust.tip}
              onChange={(e) => handleDopustChange(index, e)}
              required
            >
              <MenuItem value="1">Vacation Leave</MenuItem>
              <MenuItem value="2">Maternity Leave</MenuItem>
              <MenuItem value="3">Paternity Leave</MenuItem>
              <MenuItem value="4">Sick Leave</MenuItem>
              <MenuItem value="5">Personal Leave</MenuItem>
            </TextField>
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              fullWidth
              margin="normal"
              value={dopust.startDate}
              onChange={(e) => handleDopustChange(index, e)}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="End Date"
              name="endDate"
              type="date"
              fullWidth
              margin="normal"
              value={dopust.endDate}
              onChange={(e) => handleDopustChange(index, e)}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Box>
        ))}

        <Button
          type="button"
          variant="outlined"
          color="secondary"
          onClick={addDopust}
          fullWidth
          sx={{ mt: 2 }}
        >
          Add Another Leave
        </Button>

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
