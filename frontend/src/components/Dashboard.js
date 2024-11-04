import React, { useEffect, useState } from "react";
import { getUserRequests } from "../api/requestApi";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  Grid,
} from "@mui/material";

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const data = await getUserRequests();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching user requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRequests();
  }, []);

  // Filter requests based on search query
  const filteredRequests = requests.filter(
    (request) =>
      request.stanje.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.dopusti.some((leave) =>
        leave.tip_dopusta.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom align="center" mt={4}>
        Your Leave Requests
      </Typography>
      <TextField
        label="Search by Status or Leave Type"
        variant="outlined"
        fullWidth
        sx={{ mb: 4 }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Grid container spacing={2}>
        {filteredRequests.map((request) => (
          <Grid item xs={12} key={request.id}>
            <Card sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Request Date:{" "}
                  {new Date(request.datum_zahteve).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Status: {request.stanje}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Comment: {request.komentar}
                </Typography>
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Leave Type</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell>Reason</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {request.dopusti.map((leave, index) => (
                        <TableRow key={index}>
                          <TableCell>{leave.tip_dopusta}</TableCell>
                          <TableCell>{leave.zacetek}</TableCell>
                          <TableCell>{leave.konec}</TableCell>
                          <TableCell>{leave.razlog}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
