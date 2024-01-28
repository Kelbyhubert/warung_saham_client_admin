import { Box, Button, Divider, Grid, Paper, TextField, Typography} from '@mui/material'
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
import React, { useState } from 'react'
import { useAuth } from '../../context/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../../services/Auth/AuthService';
import jwt_decode from 'jwt-decode';

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {setUser} = useAuth();

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const res = await authenticate(username,password);
        
        if(res.status == 200){
            localStorage.setItem("TOKEN", `Bearer ${res.data.token}`);
            const data = jwt_decode(res.data.token)
            setUser(data);
            navigate("/");
        }else{
            setUsername("");
            setPassword("");
        }

    }

  return (
    <Box sx={{
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"#504099",
        minHeight: 720,
    }}>
        <Box sx={{
            margin: "2em 0em 2em 0em",
            maxWidth: "500px",
        }}>
            <Paper elevation={10} component="form" onSubmit={submitHandler}>
                <Grid container rowSpacing={1} padding={4}>
                    <Grid container xs={12} direction="column" alignItems="center">
                        <AdminPanelSettingsTwoToneIcon/>
                        <Typography variant='h4' padding={2}>
                            ADMIN LOGIN
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography padding={2}>
                            Email/Username
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            hiddenLabel
                            id='username'
                            variant='outlined'
                            fullWidth
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography padding={2}>
                            Password
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type='password'
                            hiddenLabel
                            id='password'
                            variant='outlined'
                            fullWidth
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </Grid>
                </Grid>
                <Divider variant='middle'/>
                <Box sx={{
                    padding: "1rem"
                }}>
                    <Button type='submit' variant='contained' color='secondary' fullWidth >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Box>
    </Box>
  )
}

export default SignIn;