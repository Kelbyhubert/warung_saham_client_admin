import { Box, Button, Divider, IconButton, Paper, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Typography, alpha, debounce, styled } from '@mui/material'
import React, { useEffect } from 'react';
import ModeIcon from '@mui/icons-material/Mode';
import { useNavigate } from 'react-router-dom';
import { StyledTableCell } from '../../../components/custom/table/CTableStyled';
import AddStockFormDialog from './form/AddStockFormDialog';
import { getStockListPage } from '../../../services/stock/stockService';
import SearchIcon from '@mui/icons-material/Search';
import { StyledInputBase } from '../../../components/custom/input/CustomStyleInput';


const dummyData = [
  {stockCode: "CUAN",company: "PT Petrindo Jaya Kreasi Tbk",sector: "Tambang"},
  {stockCode: "CUAN",company: "PT Petrindo Jaya Kreasi Tbk",sector: "Tambang"},
  {stockCode: "CUAN",company: "PT Petrindo Jaya Kreasi Tbk",sector: "Tambang"},
  {stockCode: "CUAN",company: "PT Petrindo Jaya Kreasi Tbk",sector: "Tambang"},
]

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

const Stock = () => {

    const navigate = useNavigate();

    const header = [
        {id: "index", label: "NO"},
        {id: "stockCode", label: "CODE"},
        {id: "company", label: "COMPANY NAME"},
        {id: "sector", label: "SECTOR"},
        {id: "action", label: "ACTION"},
    ];

    const [stockList,setStockList] = React.useState(dummyData);
    const [page, setPage] = React.useState(0);
    const [rowPerPage, setRowPerPage] = React.useState(5);
    const [totalData, setTotalData] = React.useState(0);
    const [openDialog,setOpenDialog] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    const actionHandler = (type,id) => {
        if(type === "add"){
            return handleDialog(true);
        }

        if(type === "edit"){
            return navigate(id + "/edit");
        }

    }

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

    const handleDialog = (e) => {
        setOpenDialog(e);
    }

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (e) => {
        setRowPerPage(+e.target.value);
        setPage(0);
    }

    const actionTemplate = (data) => (
        <Box>
            <IconButton key={data.id} onClick={() => actionHandler("edit",data.id)} disabled>
                <ModeIcon />
            </IconButton>
        </Box>
    );

        // buttuh refactor terkait rerender antara child dan parent
    useEffect(() => {
        const getStocksPage = async () => {
            const res = await getStockListPage(page,rowPerPage,searchValue,"");
            if(res.status === 200){
                setStockList(res.data.data.content);
                setTotalData(res.data.data.totalElements);
            }else{
                setPage(0);
                setTotalData(0);
                setStockList([]);
            }
        
        }

        if(!openDialog){
            getStocksPage();
        }
        
    },[page,rowPerPage,openDialog,searchValue]);

  return (
    <>
        <Box>
            <Typography variant='h3' component="h2">Stock List</Typography>
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
                    sx={{marginLeft: 2, width: '200px'}}
                    onClick={() => actionHandler("add",null)}
                    variant='contained'
                >
                    ADD STOCK
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
                            {stockList.map((data,index) => (
                                <TableRow key={index}>
                                    <StyledTableCell>
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {data.stockCode}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {data.company}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {data.sector}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {actionTemplate(data)}
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination 
                rowsPerPageOptions={[5,10,25]}
                rowsPerPage={rowPerPage}
                component='div'
                count={totalData}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Paper>
        </Box>

        <AddStockFormDialog open={openDialog} handleDialog={handleDialog}/>  
    </>

  )
}

export default Stock

