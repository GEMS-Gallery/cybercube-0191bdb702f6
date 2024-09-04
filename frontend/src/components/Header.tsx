import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloudIcon from '@mui/icons-material/Cloud';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <CloudIcon className="mr-2" />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          IC Box
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/files">Files</Button>
        <Button color="inherit" component={Link} to="/shared">Shared</Button>
        <Button color="inherit" component={Link} to="/settings">Settings</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
