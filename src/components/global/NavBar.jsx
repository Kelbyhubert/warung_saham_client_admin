import { AppBar, IconButton, Menu, MenuItem, Toolbar } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth/AuthContext';

const NavBar = () => {
  const {logout} = useAuth();
  const [archorEl, setArchorEl] = useState(null);

  const navigate = useNavigate();
  
  const handleClose = () => {
      setArchorEl(null);
  }

  const handleOpen = (e) => {
      setArchorEl(e.currentTarget);
  }

  const logoutHandler = () => {
    localStorage.removeItem("TOKEN");
    setArchorEl(null);
    logout();
    return navigate("/login");
  }

  return (
    <AppBar elevation={5} position='fixed' sx={{
        alignItems: "end",
        zIndex: (theme) => theme.zIndex.drawer + 1
    }}>
        <Toolbar>
            <IconButton
              size='large'
              aria-controls='appbar-profile'
              aria-haspopup="true"
              onClick={handleOpen}
            >
                <AccountCircle/>
            </IconButton>
            <Menu
              id='appbar-profile'
              anchorEl={archorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(archorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </Menu>
        </Toolbar>
    </AppBar>
  )
}

export default NavBar