import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, useTheme } from '@mui/material'
import React, { useState } from 'react'
import CNavLink from '../custom/navlink/CNavLink';

const Sidebar = () => {

    const theme = useTheme();

    const dummyMenu = [
        {id: 1, name: "Dashboard" , url: 'dashboard'},
        {id: 2, name: "Saham", url: 'saham'},
        {id: 3, name: "Insight", url: 'insight'},
        {id: 4, name: "User Management" , url: 'user-management'}
    ];

    const [menuList, setMenuList] = useState(dummyMenu);


    const listMenu = (list) => {
        return list.map((data) => (
                <ListItem key={data.id}>
                    <ListItemButton 
                        LinkComponent={CNavLink} 
                        to={data.url}
                    >
                        <ListItemText primary={data.name} />
                    </ListItemButton>
                </ListItem>
            )
        )
    }

  return (
    <Drawer
        elevation={0}
        sx={{
            flexShrink:0,
            '& .MuiDrawer-paper': {
                width: 300,
                boxSizing: 'border-box',
              },
              border:"none"
        }}
        variant='permanent'
        anchor='left'
        
    >
        <Toolbar sx={{bgcolor: theme.palette.primary.main}}/>
        <Divider />
        <List>
            {listMenu(menuList)}
        </List>
    </Drawer>
  )
}

export default Sidebar