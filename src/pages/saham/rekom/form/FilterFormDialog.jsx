import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, TextField } from '@mui/material'
import React from 'react'
import Proptypes from 'prop-types';

const FilterFormDialog = (props) => {

    const [code, setCode] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    // const [type, setType] = React.useState('')

    const closeHandler = () => {
        props.handleDialog(false);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onSubmit(code,startDate,endDate);
        clearState();
        closeHandler();
    }

    const clearState = () => {
        setCode('');
        setStartDate('');
        setEndDate('');
        // setType('');
    }

  return (
    <Dialog
        open={props.open}
        onClose={closeHandler}
        PaperProps={{
            component:"form",
            onSubmit: submitHandler
        }}
        fullWidth
    >
        <DialogTitle sx={{ m: 0, p: 2 }}>Filter</DialogTitle>
        <DialogContent>
            <Box sx={{paddingTop: 2}}>
                <InputLabel shrink={true} id="codeId">Code</InputLabel>
                <TextField type='text' labelId="codeId" hiddenLabel fullWidth onChange={(e) => setCode(e.target.value)} value={code}/>
            </Box>
            <Box sx={{paddingTop: 2}}>
                <InputLabel shrink={true} id="dateId">Rekom Date</InputLabel>
                <Box>
                    <TextField type='date' labelId="start-date" hiddenLabel onChange={(e) => setStartDate(e.target.value)} value={startDate}/>
                    
                    <TextField type='date' labelId="end-date" hiddenLabel onChange={(e) => setEndDate(e.target.value)} value={endDate}/>
                </Box>
            </Box>
            {/* <Box sx={{paddingTop: 2}}>
                <InputLabel shrink={true} id="type">Create By</InputLabel>
                <TextField type='text' labelId="createById" hiddenLabel fullWidth onChange={(e) => setType(e.target.value)} value={type}/>
            </Box> */}
        </DialogContent>
        <DialogActions>
            <Button variant='contained' fullWidth onClick={closeHandler}>Cancel</Button>
            <Button variant='contained' fullWidth type='submit'>Filter</Button>
        </DialogActions>
    </Dialog>
  )
}

FilterFormDialog.propTypes = {
    open: Proptypes.bool.isRequired,
    handleDialog: Proptypes.func.isRequired,
    onSubmit: Proptypes.func.isRequired
}

export default FilterFormDialog
