import { Box, Button, Checkbox, Chip, Grid, ListItemText, MenuItem, Paper, Select, Stack, TextField, Toolbar, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers';
import React, { useEffect } from 'react'
import { getAllRole } from '../../services/role/Role';
import { addNewUser } from '../../services/User/UserService';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line no-useless-escape
const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const AddUserForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [dob, setDob] = React.useState("");
  const [roles, setRoles] = React.useState([]);


  const [roleList, setRoleList] = React.useState([]);

  const [usernameInvalid,setUsernameInvalid] = React.useState({inValid: false ,message : ""});
  const [emailInvalid,setEmailInvalid] = React.useState({inValid: false ,message : ""});
  const [nameInvalid,setNameInvalid] = React.useState({inValid: false ,message : ""});
  const [phoneNumberInvalid,setPhoneNumberInvalid] = React.useState({inValid: false ,message : ""});
  const [dobInvalid,setDobInvalid] = React.useState({inValid: false ,message : ""});
  // const [valid,setValid] = useState(false);

  const usernameInputHandler = (e) => {
    setUsername(e.target.value);
  }

  const nameInputHandler = (e) => {
    setName(e.target.value);
  }

  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  }

  const phoneNumberInputHandler = (e) => {
    setPhoneNumber(e.target.value);
  }

  const dateInputHandler = (e) => {
    setDob(e);
  }

  const selectHandler = (e) => {
    setRoles(e.target.value);
  }

  const validationChecker = () => {

    let valid = true;
    if(username === '' || username.length < 3 || username.length > 26){
      valid = false;
      setUsernameInvalid({inValid: true, message: "Username must have 3 or more and less than 25 character"});
    }

    if(email === "" || !email.match(emailFormat)){
      valid = false;
      setEmailInvalid({inValid: true, message: "Email Invalid"});
    }

    if(name === '' || name.length < 3){
      valid = false;
      setNameInvalid({inValid: true, message: "Name must have 3 or more character"});
    }

    if(phoneNumber === '' || phoneNumber < 11){
      valid = false;
      setPhoneNumberInvalid({inValid: true, message: "Phone Number Invalid"});
    }

    if(dob === '' || dob === null){
      valid = false;
      setDobInvalid({inValid: true, message: "Choose DOB !!"});
    }

    return valid;

  }

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if(!validationChecker()) return;

    let roleIdList = roles.map((data) => {return data.id})

    let user = {
      username: username,
      email: email,
      name: name,
      phoneNumber: phoneNumber,
      dob: dob.toJSON(),
      roleIdList: roleIdList
    }

    const res = await addNewUser(user);

    if(res.status === 200){
      return navigate("/user-management");
    }
  }

  useEffect(() => {
    const getRoleList = async () => {
      const res = await getAllRole();
      
      if(res.status === 200){
        const roles = res.data.filter((data) => (data.id !== 3));
        setRoleList(roles);
      }
    }

    getRoleList();
  }, [])



  return (
    <Box>
        <Toolbar>
          <Box>
              <Typography variant='h4' padding={2}>
                    Create New User
                </Typography>
              </Box>
          </Toolbar>
        <Paper component="form" onSubmit={submitHandler}>
          <Grid container xs={12} direction="column">

          </Grid>
          <Grid container spacing={2} padding={4}>

            <Grid item xs={3}>
              <Typography variant='h6' padding={1.5}>
                USERNAME
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                hiddenLabel
                id='username'
                variant='outlined'
                fullWidth
                onChange={usernameInputHandler}
                value={username}
                error={usernameInvalid.inValid}
                helperText={usernameInvalid.inValid ? usernameInvalid.message : ""}
              />
            </Grid>

            <Grid item xs={3}>
              <Typography variant='h6' padding={1.5}>
                EMAIL
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                hiddenLabel
                id='email'
                variant='outlined'
                fullWidth
                onChange={emailInputHandler}
                value={email}
                error={emailInvalid?.inValid}
                helperText={emailInvalid?.inValid ? emailInvalid.message : ""}
              />
            </Grid>

            <Grid item xs={3}>
              <Typography variant='h6' padding={1.5}>
                NAME
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                hiddenLabel
                id='name'
                variant='outlined'
                fullWidth
                onChange={nameInputHandler}
                value={name}
                error={nameInvalid?.inValid}
                helperText={nameInvalid?.inValid ? nameInvalid.message : ""}
              />
            </Grid>

            <Grid item xs={3}>
              <Typography variant='h6' padding={1.5}>
                PHONE NUMBER
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                hiddenLabel
                id='phone number'
                variant='outlined'
                fullWidth
                onChange={phoneNumberInputHandler}
                value={phoneNumber}
                error={phoneNumberInvalid?.inValid}
                helperText={phoneNumberInvalid?.inValid ? phoneNumberInvalid.message : ""}
              />
            </Grid>

            <Grid item xs={3}>
              <Typography variant='h6' padding={1.5}>
                ROLE
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Select
                id='roles'
                multiple
                value={roles}
                onChange={selectHandler}
                renderValue={(selected) => (
                  <Stack direction="row" spacing={1}>
                  {selected.map((value) => {
                    return <Chip key={value.id} label={value.rolename.replace("ROLE_","")} />
                  })}
                 </Stack>
                )}
                fullWidth
              >
                {roleList.map((data) => (
                  <MenuItem key={data.id} value={data}>
                      <Checkbox checked={roles.indexOf(data) > -1} />
                      <ListItemText primary={data.rolename.replace("ROLE_","")} />
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={3}>
              <Typography variant='h6' padding={1.5}>
                DOB
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <DatePicker
                value={dob}
                onChange={dateInputHandler}
                hiddenLabel
                views={["year",'month','day']}
                openTo='year'
                slotProps={{
                  textField:{
                    error: dobInvalid.inValid,
                    helperText: dobInvalid.inValid ? dobInvalid.message : "",
                    fullWidth: true
                  },
                }}
              />
            </Grid>

            <Grid item xs={8}/>
            <Grid item xs={2}>
                <Button onClick={() => navigate("/user-management")} variant='contained' color='secondary' fullWidth>
                  Back
                </Button>
            </Grid>
            <Grid item xs={2}>
                <Button type='submit' variant='contained' color='secondary' fullWidth>
                  CREATE
                </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
  )
}

export default AddUserForm