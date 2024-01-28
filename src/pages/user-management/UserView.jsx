import React, { useEffect, useState } from 'react'
import { redirect, useNavigate, useParams } from 'react-router-dom'
import { getUserByUserId } from '../../services/User/UserService';
import { Chip, Grid, Stack, Typography } from '@mui/material';

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

const UserView = () => {
     const {userId} = useParams();
     const navigate = useNavigate();

     const [userData, setUserData] = useState(defaultValue);


     const roleTemplate = (userData) => {
      return userData.roles.map((data, index) => {
        let color = "primary"
        let text = data.rolename.replace("ROLE_","");

        switch (data.id) {
          case 2:
            color = "secondary"
          break;
          case 3:
            color = "error"
          break;
        }
        
        return (
          <Chip label={text} color={color} />
        )
        }
      );
    }
     
     useEffect(() => {
      const fetchUser = async () => {
        const res = await getUserByUserId(userId);

        if(res.status === 200){
          setUserData(res.data);  
        }else{
          return navigate("user-management/:userId/not-found",{replace: true})
        }

      }
      
      fetchUser();
 
     },[]);


     return (
       <>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant='h5' padding={2}>
                USER ID
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant='h5' padding={2}>
                 : {userData.userId}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='h5' padding={2}>
                EMAIL
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant='h5' padding={2}>
                 : {userData.email}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='h5' padding={2}>
                USERNAME
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant='h5' padding={2}>
                 : {userData.username}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='h5' padding={2}>
                NAME
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant='h5' padding={2}>
                 : {userData.name}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='h5' padding={2}>
                PHONE NUMBER
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant='h5' padding={2}>
                 : {userData.phoneNumber}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='h5' padding={2}>
                ROLES
            </Typography>
          </Grid>
          <Grid item xs={9}>
              <Stack direction="row" spacing={1}>
               {roleTemplate(userData)}
              </Stack>
          </Grid>
          
        </Grid>
       </>
  )
}

export default UserView


