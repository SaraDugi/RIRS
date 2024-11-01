import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { fetchLoggedInUser } from '../../api/userApi';
import { AppBar, Toolbar, Typography, Button, CircularProgress } from "@mui/material";

const Header = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const loggedInUser = await fetchLoggedInUser();
        setUser(loggedInUser);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ marginRight: '16px' }}>
          Vodenje dopustov
        </Typography>
        <Button color="inherit" component={Link} to="/" style={{ marginRight: 'auto' }}>
          Domov
        </Button>
        {loading ? (
          <CircularProgress color="inherit" style={{ marginLeft: '16px' }} />
        ) : user ? (
          <Typography color="inherit" style={{ marginLeft: '16px' }}>
             {user?.name}
          </Typography>
        ) : (
          <div>
            <Button color="inherit" component={Link} to="/login" style={{ marginLeft: '16px' }}>
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register" style={{ marginLeft: '16px' }}>
              Register
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
