import React from 'react'
import Proptypes from 'prop-types';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { createNewStock } from '../../../../services/stock/stockService';

const sectorDummyValue = [
    {id: 1, sectorName: "Tambang"},
    {id: 2, sectorName: "Financial"},
    {id: 3, sectorName: "Banking"},
    {id: 4, sectorName: "Other"},
]

const AddStockFormDialog = (props) => {

    const [stockCode,setStockCode] = React.useState("");
    const [companyName, setCompanyName] = React.useState("");
    const [sector, setSector] = React.useState("");

    const [sectorList, setSectorList] = React.useState(sectorDummyValue);

    const stockCodeInputHandler = (e) => {
        setStockCode(e.target.value);
    }

    const companyNameInputHandler = (e) => {
        setCompanyName(e.target.value);
    }

    const sectorInputHandler = (e) => {
        setSector(e.target.value);
    }

    const closeHandler = () =>  {
        props.handleDialog(false);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const newStock = {
            stockCode: stockCode,
            company: companyName,
            sector: sector.sectorName,
        }
        const res = await createNewStock(newStock);

        if(res.status === 200){
            closeHandler();
        }else{
            console.log("something when wrong");
        }
    }

  return (
    <Dialog
        open={props.open}
        onClose={closeHandler}
        PaperProps={{
            component: 'form',
            onSubmit: submitHandler,
        }}
        fullWidth
    >
        <DialogTitle sx={{ m: 0, p: 2 }}>Add Stock</DialogTitle>
        <DialogContent>
            <Box sx={{paddingTop: 2}}>
                <InputLabel shrink={true} id="codeId">Stock Code</InputLabel>
                <TextField type='text' labelId="codeId" hiddenLabel value={stockCode} onChange={stockCodeInputHandler} fullWidth/>
            </Box>

            <Box sx={{paddingTop: 2}}>
                <InputLabel shrink={true} id="companyId">Company Name</InputLabel>
                <TextField type='text' labelId="companyId" hiddenLabel value={companyName} onChange={companyNameInputHandler} fullWidth/>
            </Box>

            <Box sx={{paddingTop: 2}}>
                <InputLabel shrink={true} id="planId">Sector</InputLabel>
                <Select fullWidth labelId='planId' value={sector} onChange={sectorInputHandler}>
                    {sectorList.map(data => 
                            <MenuItem key={data.id} value={data}>{data.sectorName}</MenuItem>
                        )
                    }
                </Select>
            </Box>

        </DialogContent>
        <DialogActions>
            <Button variant='contained' fullWidth onClick={closeHandler}>Cancel</Button>
            <Button variant='contained' fullWidth type='submit'>Add</Button>
        </DialogActions>
    </Dialog>
  )
}

AddStockFormDialog.propTypes = {
    open: Proptypes.bool.isRequired,
    handleDialog: Proptypes.func.isRequired,
}

export default AddStockFormDialog
