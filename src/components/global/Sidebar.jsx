import { Collapse, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, useTheme } from '@mui/material'
import React from 'react'
import CNavLink from '../custom/navlink/CNavLink';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const Sidebar = () => {

    const theme = useTheme();

    const dummyMenu = [
        {id: 1, name: "Dashboard" , url: 'dashboard', child: []},
        {id: 2, name: "Saham", url: null, child: [
            {id: 1, name: "Rekom" , url: 'saham/rekom', child: []},
            {id: 2, name: "Stock" , url: 'saham/stock', child: []},
        ]},
        {id: 3, name: "Insight", url: 'insight', child: []},
        {id: 4, name: "User Management" , url: 'user-management', child: []}
    ];

    const [menuList, setMenuList] = React.useState(dummyMenu);
    const [openMenuId,setOpenMenuId] = React.useState(-1);

    const handleClickMenu = (index) => {
        if(index === openMenuId){
            setOpenMenuId(-1);
        }else{
            setOpenMenuId(index);
        }
    }


    const listMenu = (list) => {
        return list.map((data) => {
            if(data.url !== null){
                return (
                    <ListItem key={data.id}>
                        <ListItemButton 
                            LinkComponent={CNavLink} 
                            to={data.url}
                            onClick={() => handleClickMenu(-1)}
                        >
                            <ListItemText primary={data.name} />
                        </ListItemButton>
                    </ListItem>
                )
            }else{
                return (
                    <>
                        <ListItem key={data.name}>
                            <ListItemButton LinkComponent={CNavLink} onClick={() => handleClickMenu(data.id)}>
                                <ListItemText primary={data.name}/>
                                {openMenuId === data.id ? <ExpandMore/> : <ExpandLess/>}
                            </ListItemButton>
                        </ListItem>
                        <Collapse in={openMenuId === data.id} timeout="auto" unmountOnExit>
                        <List  >
                            {data.child.map((childData) => (
                                    <ListItem key={data.name + "/" + childData.name}>
                                        <ListItemButton 
                                            sx={{ pl: 4 }} 
                                            LinkComponent={CNavLink} 
                                            to={childData?.url}
                                        >
                                            <ListItemText primary={childData.name}/>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            )}
                        </List>
                        </Collapse>
                    </>

                )

            }
        }
                

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