import React from 'react'
// import { useAuth } from '../../context/Auth/AuthContext'
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user)

  return (
    <>
      <Typography variant='h5' padding={2}>
        Welcome , {user.username}
      </Typography>
    </>
  )
}

export default Dashboard