import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow , TablePagination, IconButton , tableCellClasses, Toolbar, Paper, Button } from '@mui/material';
import {styled} from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import React, { useEffect, useState } from 'react'
import { getAllUser } from '../../services/User/UserService';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
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

    const [userList, setuserList] = useState(dummyData);
    const [page, setPage] = useState(0);
    const [rowPerPage, setRowPerPage] = useState(5);
    const [totalData, setTotalData] = useState(0);

    const header = [
        {id: "index", label: "NO"},
        {id: "username", label: "Username"},
        {id: "email", label: "Email"},
        {id: "phoneNumber", label: "Phone Number"},
        {id: "action", label: "Action"},
    ];


    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (e) => {
        setRowPerPage(+e.target.value);
        setPage(0);
    }

    const actionHandler = (type,id) => {
        if(type === "view"){
            return navigate("" + id);
        }

        if(type === "add"){
            return navigate("add-user");
        }

        if(type === "delete"){
            console.log("tes");
        }

    }

    const actionTemplate = (data) => (
        <Box>
            <IconButton onClick={() => actionHandler("view",data.userId)}>
                <VisibilityIcon />
            </IconButton>
            <IconButton>
                <SettingsIcon />
            </IconButton>
        </Box>
    )

    useEffect(() => {
        const getUserList = async () => {
            const res = await getAllUser(page,rowPerPage);
            setuserList(res.data.content);
            setTotalData(res.data.totalElements);
        }
        getUserList();
    },[page,rowPerPage])


  return (
    <Box>
        <Toolbar>
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
                        <TableRow key={index} >
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