import React from 'react';
import { Typography, Paper, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const WelcomeAdmin = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          textAlign: 'center',
          maxWidth: 400,
          width: '100%',
        }}
      >
        <Typography variant="h4" component="div" gutterBottom>
          Welcome, Admin!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          You have access to the admin dashboard.
        </Typography>
        <Button
          variant="contained"
          color="primary"
        //   component={Link}
        //   to="/login"
        >
          WelcomeAdmin
        </Button>
      </Paper>
    </Box>
  );
};

export default WelcomeAdmin;
