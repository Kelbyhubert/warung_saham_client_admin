import React from 'react'
import Sidebar from '../components/global/Sidebar'
import NavBar from '../components/global/NavBar'
import Footer from '../components/global/Footer'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'


const Root = () => {
    return (
        <>
            <NavBar />
            <Box sx={{
                width: `calc(100% - 300px)`, ml: `300px`,
                bgcolor: (theme) => theme.palette.background.main
            }}>
                <Sidebar/>
                <Box sx={{
                    marginLeft: 4,
                    marginRight: 4,
                    paddingTop: 12,
                    minHeight: "90vh"
                }}>
                    <Box sx={{borderRadius: '16px' ,bgcolor: 'background.paper',}}>
                        <Box sx={{
                            marginLeft: 4,
                            marginRight: 4,
                            paddingBottom: 4,
                            paddingTop: 4,
                        }}>
                            <Outlet />
                        </Box> 
                    </Box>
                </Box>
                <Footer />
            </Box>

        </>
      )
}

export default Root;