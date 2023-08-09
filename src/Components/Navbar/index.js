import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import './style.css';

const Navbar = () => {
    return (
        <AppBar position="static" className='header'>
            <Toolbar>
                <Typography className="title" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Space Exploration App
                </Typography>
                <Button component={Link} to="/" color="inherit">APOD</Button>
                <Button component={Link} to="/mars-rover-photos" color="inherit">Mars Rover Photos</Button>
                <Button component={Link} to="/near-earth-objects" color="inherit">Near Earth Objects</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
