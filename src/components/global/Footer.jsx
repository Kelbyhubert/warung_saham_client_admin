import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'

function Footer() {
  const theme = useTheme();
  return (
    <Box sx={{
        display: 'block',
        bgcolor: theme.palette.secondary.light
    }}>
        <Typography align='right' padding={1}>
            @Waroeng_Saham   
        </Typography>
    </Box>
  )
}

export default Footer