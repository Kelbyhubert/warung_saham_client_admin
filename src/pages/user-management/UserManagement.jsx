import { Box, Table, TableBody, TableContainer, TableHead, TableRow , TablePagination, IconButton , Toolbar, Paper, Button, Typography, Divider, debounce } from '@mui/material';
import {alpha, styled} from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import React, { useEffect } from 'react'
import { getAllUser } from '../../services/User/UserService';
import { useNavigate } from 'react-router-dom';
import { StyledTableCell } from '../../components/custom/table/CTableStyled'
import SearchIcon from '@mui/icons-material/Search';
import { StyledInputBase } from '../../components/custom/input/CustomStyleInput';


const Search = styled('div')(({ theme }) => ({
position: 'relative',
borderRadius: theme.shape.borderRadius,
backgroundColor: alpha(theme.palette.common.white, 0.15),
'&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
},
marginLeft: 0,
width: '100%',
[theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
padding: theme.spacing(0, 2),
height: '100%',
position: 'absolute',
pointerEvents: 'none',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
}));



const dummyData = [
    {username: "horizon", email: "email", phoneNumber: "0812921819"},
    {username: "horizon", email: "email", phoneNumber: "0812921819"},
    {username: "horizon", email: "email", phoneNumber: "0812921819"},
    {username: "horizon", email: "email", phoneNumber: "0812921819"},
    {username: "horizon", email: "email", phoneNumber: "0812921819"},
    {username: "horizon", email: "email", phoneNumber: "0812921819"},
    {username: "horizon", email: "email", phoneNumber: "0812921819"},
    {username: "horizon", email: "email", phoneNumber: "0812921819"},
    {username: "horizon", email: "email", phoneNumber: "0812921819"},
    {username: "horizon", email: "email", phoneNumber: "0812921819"},
    {username: "horizon", email: "email", phoneNumber: "0812921819"},
    {username: "horizon", email: "email", phoneNumber: "0812921819"},
    {username: "horizon", email: "email", phoneNumber: "0812921819"},
    {username: "horizon", email: "email", phoneNumber: "0812921819"},
    {username: "horizon", email: "email", phoneNumber: "0812921819"},
    {username: "horizon", email: "email", phoneNumber: "0812921819"},
    {username: "horizon", email: "email", phoneNumber: "0812921819"},
    {username: "horizon", email: "email", phoneNumber: "0812921819"},
]

const UserManagement = () => {

    const navigate = useNavigate();

    const [userList, setUserList] = React.useState(dummyData);
    const [page, setPage] = React.useState(0);
    const [rowPerPage, setRowPerPage] = React.useState(5);
    const [totalData, setTotalData] = React.useState(0);
    const [searchValue, setSearchValue] = React.useState('');

    const header = [
        {id: "index", label: "NO"},
        {id: "username", label: "Username"},
        {id: "email", label: "Email"},
        {id: "phoneNumber", label: "Phone Number"},
        {id: "action", label: "Action"},
    ];

    const search = React.useMemo(
        () => {
            return debounce(e => {
                if(e.input.length > 2){
                    setSearchValue(e.input);
                }else{
                    console.log(e.input);
                    setSearchValue('');
                }
            },400)
        },[]
    )


    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (e) => {
        setRowPerPage(+e.target.value);
        setPage(0);
    }

    const actionHandler = (type,id) => {
        if(type === "setting"){
            return navigate("" + id);
        }

        if(type === "add"){
            return navigate("add-user");
        }

    }

    const actionTemplate = (data) => (
        <Box>
            <IconButton onClick={() => actionHandler("setting",data.userId)}>
                <SettingsIcon />
            </IconButton>
        </Box>
    )

    useEffect(() => {
        const getUserList = async () => {
            const res = await getAllUser(page,rowPerPage, searchValue);
            setUserList(res.data.data.content);
            setTotalData(res.data.data.totalElements);
        }
        getUserList();
    },[page,rowPerPage,searchValue])


  return (
    <Box>
        <Typography variant='h3' component="h2">
            USER MANAGEMENT
        </Typography>
        <Divider/>
        <Toolbar>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}/>    
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>

                <StyledInputBase
                placeholder="Search..."
                onChange={e => search({input: e.target.value})}
                inputProps={{ 'aria-label': 'search', }}
                />
            </Search>
            
            <Button
                onClick={() => actionHandler("add",null)}
                variant='contained'
            >
                Create New User
            </Button>
        </Toolbar>
        <Paper elevation={3} sx={{margin:2}}>
            <TableContainer sx={{height: 400}} >
                <Table stickyHeader >
                    <TableHead>
                        <TableRow>
                            {header.map((column) => (
                                <StyledTableCell key={column.id}>
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList.map((data,index) => (
                            <TableRow key={data?.userId} >
                                <StyledTableCell >
                                    {index + 1 + (page * rowPerPage)}
                                </StyledTableCell>
                                <StyledTableCell >
                                    {data?.username}
                                </StyledTableCell>
                                <StyledTableCell >
                                    {data?.email}
                                </StyledTableCell>
                                <StyledTableCell >
                                    {data?.phoneNumber}
                                </StyledTableCell>
                                <StyledTableCell >
                                    {actionTemplate(data)}
                                </StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    
                </Table>
            </TableContainer>
            <TablePagination 
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalData}
                rowsPerPage={rowPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>

    </Box>
  )
}

export default UserManagement