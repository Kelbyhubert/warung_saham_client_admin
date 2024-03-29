import { Box, Button, Divider, Grid, Paper, TextField, Typography} from '@mui/material'
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../redux/auth/actions/AuthActions';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

    const navigate = useNavigate();

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const message = useSelector((state) => state.auth.message);
    const dispatch = useDispatch();


    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            await dispatch(loginAction({username,password}));
            navigate('/')
        }catch(e){
            setUsername('');
            setPassword('');
        }
        
    }

  return (
    <Box sx={{
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"#504099",
        minHeight: "100vh",
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
                        <Typography variant='h6' padding={2}>
                            {message}
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