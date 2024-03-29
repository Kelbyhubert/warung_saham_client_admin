import { Box, Button, Divider, IconButton, Paper, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Typography } from '@mui/material'
import React, { useEffect } from 'react';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { StyledTableCell } from '../../../components/custom/table/CTable';
import { deleteRekom, getAllRekom } from '../../../services/rekom/RekomService';



const Rekom = () => {

    const navigate = useNavigate();

    const header = [
        {id: "index", label: "NO"},
        {id: "code", label: "CODE"},
        {id: "rekomDate", label: "REKOM DATE"},
        {id: "entry", label: "ENTRY"},
        {id: "target", label: "Target"},
        {id: "stopLoss", label: "SL"},
        {id: "rekomType", label: "TYPE"},
        {id: "action", label: "ACTION"},
    ];

    const [rekomList,setRekomList] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowPerPage, setRowPerPage] = React.useState(5);
    const [totalData, setTotalData] = React.useState(0);

    const actionHandler = (type,id) => {
        if(type === "create"){
            return navigate("create")
        }

        if(type === "edit"){
            return navigate(id + "/edit");
        }

        if(type === "delete"){
            handleDeleteRekom(id);
        }

    }

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (e) => {
        setRowPerPage(+e.target.value);
        setPage(0);
    }

    const handleDeleteRekom = async (id) => {
        const res = await deleteRekom(id);
        getUserList();
    }

    const actionTemplate = (data) => (
        <Box>
            <IconButton key={data.id} onClick={() => actionHandler("edit" ,data.id)}>
                <ModeIcon />
            </IconButton>
            <IconButton key={data.id} onClick={() => actionHandler("delete",data.id)}>
                <DeleteIcon />
            </IconButton>
        </Box>
    );

    const dateTemplate = (value) => {
        const date = new Date(value).toISOString().split('T')[0];
        return <p> {date} </p> 
     }

     const getUserList = async () => {
        const res = await getAllRekom(page,rowPerPage);
        setRekomList(res.data.data.content);
        setTotalData(res.data.data.totalElements);
    }

     useEffect(() => {
        getUserList();
    },[page,rowPerPage]);

    

  return (
    <Box>
        <Typography variant='h3' component="h2">Rekomendasi Saham</Typography>
        <Divider/>
        <Toolbar>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}/>    
            <Button
                sx={{marginLeft: 2, width: '200px'}}
                onClick={() => {}}
                variant='outlined'  
            >
                Filter
            </Button>
            <Button
                sx={{marginLeft: 2, width: '200px'}}
                onClick={() => actionHandler("create",null)}
                variant='contained'
            >
                Create New Rekom
            </Button>
        </Toolbar>

        <Paper elevation={2} sx={{margin: 2}}>
            <TableContainer sx={{height: 400}}>
                <Table stickyHeader>
                    <TableHead>
                        {header.map((column) => (
                                <StyledTableCell key={column.id}>
                                    {column.label}
                                </StyledTableCell>
                            ))}
                    </TableHead>
                    <TableBody>
                        
                        {rekomList.length > 0 ? 
                            rekomList.map((data,index) => (
                                <TableRow key={data.id}>
                                    <StyledTableCell>
                                        {index + 1 + (page * rowPerPage)}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {data.stockCode}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {dateTemplate(data.rekomDate)}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {data.entryFrom} - {data.entryTo}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {data.target}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {data.stopLoss}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {data.rekomType}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {actionTemplate(data)}
                                    </StyledTableCell>
                                </TableRow>
                            ))
                            :
                            <p>No Data</p>
                        }
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

export default Rekom
