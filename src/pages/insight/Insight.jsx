import React from 'react'
import { Box, Button, Divider, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import CTable from '../../components/custom/table/CTable'
import Column from '../../components/custom/table/Column'
import ModeIcon from '@mui/icons-material/Mode';
import { useNavigate } from 'react-router-dom';
import { getInsightPerPage } from '../../services/Insight/InsightService'
import FilterFormDialog from './form/FilterFormDialog';


const dummy = [
  {id: 0, title: "hello", createBy: "dummy", createDate: Date.now(), updateBy: null, updateDate: null}
]

const Insight = () => {

  const navigate = useNavigate();

  const [insightList, setInsightList] = React.useState(dummy);
  const [page, setPage] = React.useState(0);
  const [rowPerPage, setRowPerPage] = React.useState(5);
  const [totalData, setTotalData] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  

  const handleChangePage = (e, newPage) => {
      setPage(newPage);
  }

  const handleChangeRowsPerPage = (e) => {
      setRowPerPage(+e.target.value);
      setPage(0);
  }

  const handleDialog = (e) => {
    setOpenDialog(e);
  }

  const actionHandler = (type,id) => {
    if(type === "create"){
        return navigate("create")
    }

    if(type === "edit"){
        return navigate(id + "/edit");
    }

  }

  const filterHandler = (title, createBy, fromDate,endDate) => {
    
    const filterData = {
      title,
      createBy,
      fromDate,
      endDate
    }

    getInsightList(filterData);
  }


  const actionTemplate = (data) => (
    <Box>   
        <IconButton key={data.id} onClick={() => actionHandler("edit" ,data.id)}>
            <ModeIcon />
        </IconButton>
    </Box>
  )

  const dateTemplate = (value) => {
    if(value === null) return value;
    const date = new Date(value).toISOString().split('T')[0];
    return <p>{date}</p>
  
 }

 const getInsightList = React.useCallback(async (filter) => {
    
    const res = await getInsightPerPage(page,rowPerPage,filter);

    if(res.status === 200){
      setInsightList(res.data.data.content);
      setTotalData(res.data.data.totalElements);
    }else{
      setInsightList([]);
    }
},[]);

  React.useEffect(() => {
    getInsightList(null);
  },[page,rowPerPage,getInsightList]);

  return (
    <>
        <Box>
      <Typography variant='h3' component="h2">Insight</Typography>
      <Divider/>
      <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}/>    
          <Button
              sx={{marginLeft: 2, width: '200px'}}
              onClick={() => handleDialog(true)}
              variant='outlined'
          >
              Filter
          </Button>
          <Button
              sx={{marginLeft: 2, width: '200px'}}
              onClick={() => actionHandler('create',null)}
              variant='contained'
          >
              Create Insight
          </Button>
      </Toolbar>

      <Paper elevation={2} sx={{margin: 2}}> 
      
        <CTable 
          dataList={insightList} 
          changePageFunc={handleChangePage} 
          changeRowsPerPageFunc={handleChangeRowsPerPage} 
          totalData={totalData} 
          rowPerPage={rowPerPage} 
          pageIndex={page}
        >
          <Column body={(_,index) => (rowPerPage * page) + index + 1} header="NO" />
          <Column field="title" header="title"/>
          <Column field="createBy" header="Create By"/>
          <Column body={(data) => dateTemplate(data.createDate)} header="Create Date"/>
          <Column field="updateBy" header="Update By"/>
          <Column body={(data) => dateTemplate(data.updateDate)} header="Update Date" />
          <Column body={(data) => actionTemplate(data)} header="Action"/>
        </CTable>
      </Paper>
    </Box>
    <FilterFormDialog open={openDialog} handleDialog={handleDialog} onSubmit={filterHandler}/>
    </>

  )
}

export default Insight
