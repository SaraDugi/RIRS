import React from "react";
import { Typography, Container, Grid, Button, Paper } from "@mui/material";

const Home = () => {
  return (
    <div>
      <Container maxWidth="lg" style={{ marginTop: "40px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to our Leave Management Application!
        </Typography>
        <Typography
          variant="body1"
          align="center"
          style={{ marginBottom: "60px" }}
        >
          This application is designed to facilitate the management of employee
          leave requests.
        </Typography>

        <Grid container spacing={4}>
          {[
            {
              title: "User Registration",
              description:
                "Users can register, allowing for easy submission of requests under their name.",
            },
            {
              title: "Login",
              description:
                "Users can log in to their accounts to view and manage their requests.",
            },
            {
              title: "Submit Leave Requests",
              description:
                "Quickly submit leave requests (name, type, start and end dates).",
            },
            {
              title: "View Requests",
              description: "Review all your requests and track their status.",
            },
            {
              title: "Admin Dashboard",
              description:
                "Admins can quickly approve or deny employee requests.",
            },
            {
              title: "Leave Statistics",
              description:
                "View leave statistics and popular leave types among employees.",
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                style={{
                  padding: "20px",
                  minHeight: "100px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f8f8f8",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                  transition: "transform 0.2s",
                  marginTop: index > 2 ? "10px" : "20px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <Typography variant="h6" align="center" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" align="center">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "40px" }}
            href="/request"
          >
            Submit Leave Request
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Home;
