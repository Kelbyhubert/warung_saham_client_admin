import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, TextField } from '@mui/material'
import React from 'react'
import Proptypes from 'prop-types';

const FilterFormDialog = (props) => {

    const [title, setTitle] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [createBy, setCreateBy] = React.useState('')

    const closeHandler = () => {
        props.handleDialog(false);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onSubmit(title, createBy, startDate,endDate);
        clearState();
        closeHandler();
    }

    const clearState = () => {
        setTitle('');
        setStartDate('');
        setEndDate('');
        setCreateBy('');
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
                <InputLabel shrink={true} id="titleId">Title</InputLabel>
                <TextField type='text' labelId="titleId" hiddenLabel fullWidth onChange={(e) => setTitle(e.target.value)} value={title}/>
            </Box>
            <Box sx={{paddingTop: 2}}>
                <InputLabel shrink={true} id="dateId">Create Date</InputLabel>
                <Box>
                    <TextField type='date' labelId="start-date" hiddenLabel onChange={(e) => setStartDate(e.target.value)} value={startDate}/>
                    
                    <TextField type='date' labelId="end-date" hiddenLabel onChange={(e) => setEndDate(e.target.value)} value={endDate}/>
                </Box>
            </Box>
            <Box sx={{paddingTop: 2}}>
                <InputLabel shrink={true} id="createById">Create By</InputLabel>
                <TextField type='text' labelId="createById" hiddenLabel fullWidth onChange={(e) => setCreateBy(e.target.value)} value={createBy}/>
            </Box>
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
