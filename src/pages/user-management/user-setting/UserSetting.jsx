import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserByUserId } from '../../../services/User/UserService';
import { Grid, Typography,Checkbox, Autocomplete, TextField, Box, Toolbar, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Tabs, Tab } from '@mui/material';
import { getAllRole } from '../../../services/role/Role';
import PremiumFormDialog from './PremiumFormDialog';

const defaultValue = {
  userId: "dummy",
  username: "dummy",
  email: "dummy",
  name: "dummy",
  phoneNumber: "dummy",
  roles: [
    { id: 1, rolename: "dummy"}
  ]
}

const header = [
  {id: "index", label: "NO"},
  {id: "plan", label: "Plan"},
  {id: "start", label: "Start Date"},
  {id: "end", label: "End Date"},

];


const UserSetting = () => {
     const {userId} = useParams();
     const navigate = useNavigate();

     const [tab,setTab] = React.useState(1);
     const [openDialog, setOpenDialog] = React.useState(false);

     const [userData, setUserData] = React.useState(defaultValue);
     const [userPremiumList, setUserPremiumList] = React.useState([]);

     const [roles, setRoles] = React.useState([]);
     const [roleList, setRoleList] = React.useState([]);


    const changeTabsHandler = (e,index) => {
      setTab(index);
    }

    const handleDialog = (e) => {
        setOpenDialog(e);
    }

    const selectHandler = (e,newValue) => {
      setRoles(newValue);
    }

     
     useEffect(() => {
      const fetchUser = async () => {
        const res = await getUserByUserId(userId);

        if(res.status === 200){
          const user = res.data;
          setUserData(user);
          setRoles(user.roles)
          setUserPremiumList(user.premiumSubList);
        }else{
          return navigate("user-management/:userId/not-found",{replace: true})
        }
      }

      const getRoleList = async () => {
        const res = await getAllRole();
        
        if(res.status === 200){
          const roles = res.data
          setRoleList(roles);
          
        }
      }

      fetchUser();
      getRoleList();
     },[]);


     const dateTemplate = (value) => {
        const date = new Date(value).toISOString().split('T')[0];
        return <p> {date} </p> 
     }


     return (
       <>
          <Toolbar>
            <Box>
              <Typography variant='h4'> User Setting </Typography>
            </Box>
          </Toolbar>
          <Box sx={{marginTop: 4}}>
          <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs value={tab} onChange={changeTabsHandler}>
                  <Tab value={1} label="User Detail"/>
                  <Tab value={2} label="Premium Detail"/>
            </Tabs>
          </Box>

          {tab === 1 ? 
            <Box>
              <Toolbar>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}><Typography variant='h5'> User Detail </Typography></Box>
                <Button variant='contained'>Save</Button>
              </Toolbar>
              <Grid container spacing={2} padding={4}>
                <Grid item xs={1.5}>
                  <Typography  >
                      USER ID
                  </Typography>
                </Grid>
                <Grid item xs={10.5}>
                  <Typography  >
                    : {userData.userId}
                  </Typography>
                </Grid>
                <Grid item xs={1.5}>
                  <Typography  >
                      EMAIL
                  </Typography>
                </Grid>
                <Grid item xs={10.5}>
                  <Typography  >
                      : {userData.email}
                  </Typography>
                </Grid>
                <Grid item xs={1.5}>
                  <Typography  >
                      USERNAME
                  </Typography>
                </Grid>
                <Grid item xs={10.5}>
                  <Typography  >
                      : {userData.username}
                  </Typography>
                </Grid>
                <Grid item xs={1.5}>
                  <Typography  >
                      NAME
                  </Typography>
                </Grid>
                <Grid item xs={10.5}>
                  <Typography  >
                      : {userData.name}
                  </Typography>
                </Grid>
                <Grid item xs={1.5}>
                  <Typography  >
                      PHONE NUMBER
                  </Typography>
                </Grid>
                <Grid item xs={10.5}>
                  <Typography  >
                      : {userData.phoneNumber}
                  </Typography>
                </Grid>
                <Grid item xs={1.5} >
                  <Typography  >
                      ROLES
                  </Typography>
                </Grid>
                <Grid item xs={0.1}>
                  <Typography  >
                      :
                  </Typography>
                </Grid>
                <Grid xs={10} padding={1}>
                  <Box>
                    <Autocomplete
                        multiple
                        size='small'
                        id="checkbox-roles"
                        value={roles}
                        options={roleList}
                        disableCloseOnSelect
                        onChange={selectHandler}
                        isOptionEqualToValue={(option,value) => option.id === value.id}
                        getOptionLabel={(option) => option.rolename}
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>
                            <Checkbox checked={selected}/>
                            {option.rolename}
                          </li>
                        )}
                        renderInput={(params) => (
                          <TextField {...params} size='small' />
                        )}
                    />
                  </Box>
                  
                </Grid>
              </Grid>
            </Box>
            :
            ""
          }  

          {tab === 2 ? 
            <Box>
              <Toolbar>
                <Box sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}>
                  <Typography variant='h5' component='h6'> Premium Detail </Typography>
                </Box>
                <Button variant='contained' onClick={() => handleDialog(true)}>Add Premium</Button>
              </Toolbar>
              
                  <Paper elevation={3} sx={{margin:2}}>
                      <TableContainer sx={{height: 400}} >
                          <Table stickyHeader >
                              <TableHead>
                                  <TableRow>
                                      {header.map((column) => (
                                          <TableCell key={column.id}>
                                              {column.label}
                                          </TableCell>
                                      ))}
                                  </TableRow>
                              </TableHead>
                              {userPremiumList.length > 0 
                                  ? 
                                  <TableBody>
                                    {userPremiumList.map((data,index) => (
                                        <TableRow key={index} >
                                            <TableCell >
                                                {index + 1}
                                            </TableCell>
                                            <TableCell >
                                                {data?.plan?.planName}
                                            </TableCell>
                                            <TableCell >
                                                {dateTemplate(data?.startDate)}
                                            </TableCell>
                                            <TableCell >
                                                {dateTemplate(data?.endDate)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>  
                                :
                                <p>No Data</p>                            
                            
                            }

                              
                          </Table>
                      </TableContainer>
                  </Paper>
              
            </Box>
          :
          ""}

          </Box>

          <PremiumFormDialog open={openDialog} handleDialog={handleDialog}/>                  

       </>
  )
}

export default UserSetting


