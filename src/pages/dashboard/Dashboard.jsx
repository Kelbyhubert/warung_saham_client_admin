import React from 'react'
import { useAuth } from '../../context/Auth/AuthContext'
import { Typography } from '@mui/material';

const Dashboard = () => {

  const {user} = useAuth();

  return (
    <>
      <Typography variant='h5' padding={2}>
        Welcome , {user.username}
      </Typography>
    </>
  )
}

export default Dashboard