import { Box, IconButton, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Toolbar, Checkbox } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react'
import { StyledTableCell } from '../custom/table/CTableStyled';
import PropTypes from "prop-types";



const RekomTargetTable = (props) => {

    const [indexEditMode,setIndexEditMode] = React.useState(-1);
    const [createMode, setCreateMode] = React.useState(false);

    const [targetFrom, setTargetFrom] = React.useState(0);
    const [targetTo, setTargetTo] = React.useState(0);
    const [status , setStatus] = React.useState(0);
    const [orders,setOrders] = React.useState(0);


    const actionHandler = (action,data,index) => {
        setIndexEditMode(index);
        if(action === "open"){
            setTargetFrom(data.targetFrom);
            setTargetTo(data.targetTo);
            setOrders(data.orders);
            setStatus(data.status);
        }else{
            setTargetFrom(0);
            setTargetTo(0);
            setOrders(0);
            setCreateMode(false);
        }
    }

    const saveChangeHandler = () => {
        const targetData = {
            index: indexEditMode,
            targetFrom,
            targetTo,
            orders,
            status
        }
        props.updateTargetHandler(targetData);
        setIndexEditMode(-1);
        setTargetFrom(0);
        setTargetTo(0);
    }

    const checkBoxHandler = (data,index) => {
        const targetData = {
            index,
            targetFrom: data.targetFrom,
            targetTo: data.targetTo,
            status: data.status === 0 ? 1 : 0,
            orders: data.orders,
        }
        props.updateTargetHandler(targetData);
    }


    const addTargetHandler = () => {
        const targetData = {
            id : 0,
            targetFrom,
            targetTo,
            status: 0,
            orders,
        }
        props.createNewTargetHandler(targetData)
        setCreateMode(false)
        setTargetFrom(0);
        setTargetTo(0);
    }


    const actionTemplate = (data,index) => (
        <Box>
            {
                indexEditMode !== index? 
                <>
                    <IconButton key={index} onClick={() => actionHandler("open",data,index)} disabled={createMode}>
                        <ModeIcon />
                    </IconButton>
                    <IconButton key={index} onClick={() => props.deleteTarget(index)} disabled={createMode}>
                        <DeleteIcon />
                    </IconButton>
                </>
                :
                <>
                    <IconButton key={index} onClick={() => saveChangeHandler()}>
                        <CheckIcon />
                    </IconButton>
                    <IconButton key={index} onClick={() => actionHandler("close",null,-1)}>
                        <CloseIcon />
                    </IconButton>
                </>
            }
        </Box>
    );

    const addActionTemplate = (index) => (
        <Box>
            <IconButton key={index} onClick={() => addTargetHandler()}>
                <CheckIcon />
            </IconButton>
            <IconButton key={index} onClick={() => actionHandler("close",null,-1)}>
                <CloseIcon />
            </IconButton>
        </Box>
    )


  return (
    <TableContainer sx={{height: 400 , border: '1px solid rgba(0, 0, 0, 0.2)', borderRadius: 1}}>
        <Toolbar>
            <Box flexGrow={1}/>
            <IconButton id='addTarget' onClick={() => setCreateMode(true)} disabled={indexEditMode > -1}>
                <AddIcon/>
            </IconButton>
        </Toolbar>
        <Table stickyHeader>
            <TableHead>
                {props.header.map((data) => (
                    <StyledTableCell key={data.id}>
                        {data.label}
                    </StyledTableCell>
                ))}
            </TableHead>
            <TableBody>
                {props.targetList.length > 0 &&
                    props.targetList.map((data,index) => (
                        <TableRow key={index}>
                            <StyledTableCell>
                                {index + 1}
                            </StyledTableCell>
                            <StyledTableCell>
                                {indexEditMode === index ?
                                    <Box display="flex" alignItems='center'>
                                        <TextField sx={{width: 80,paddingX:2 }} type='number' variant='outlined' value={targetFrom} onChange={e => setTargetFrom(e.target.value)}/>
                                        -
                                        <TextField sx={{width: 80,paddingX:2}} type='number' variant='outlined' value={targetTo} onChange={e => setTargetTo(e.target.value)}/>
                                    </Box>
                                    :
                                    <p>{data?.targetFrom} - {data?.targetTo}</p>

                                }
                            </StyledTableCell>
                            <StyledTableCell>
                                {indexEditMode == index ? 
                                <TextField sx={{width: 80,paddingX:2 }} type='number' variant='outlined' value={orders} onChange={e => setOrders(e.target.value)}/>
                                : 
                                <p>{data?.orders}</p>
                                }
                            </StyledTableCell>
                            <StyledTableCell>
                                <Checkbox checked={data?.status === 1} onChange={() => checkBoxHandler(data,index)} disabled={indexEditMode === index}/>
                            </StyledTableCell>
                            <StyledTableCell>
                                {actionTemplate(data,index)}
                            </StyledTableCell>
                        </TableRow>
                    ))
                }
                {createMode && 
                    <TableRow key={props.targetList.length + 1}>
                        <StyledTableCell>
                            {props.targetList.length + 1}
                        </StyledTableCell>
                        <StyledTableCell>
                            <Box display="flex" alignItems='center'>
                                <TextField sx={{width: 80,paddingX:2 }} type='number' variant='outlined' value={targetFrom} onChange={e => setTargetFrom(e.target.value)}/>
                                -
                                <TextField sx={{width: 80,paddingX:2}} type='number' variant='outlined' value={targetTo} onChange={e => setTargetTo(e.target.value)}/>
                            </Box>
                        </StyledTableCell>
                        <StyledTableCell>
                            <TextField sx={{width: 80,paddingX:2 }} type='number' variant='outlined' value={orders} onChange={e => setOrders(e.target.value)}/>
                        </StyledTableCell>
                        <StyledTableCell>
                                <Checkbox disabled/>
                            </StyledTableCell>
                        <StyledTableCell>
                            {addActionTemplate(props.targetList.length + 1)}
                        </StyledTableCell>
                    </TableRow>}
                {props.targetList.length < 1 && <p>No Data</p>}
            </TableBody>
        </Table>
    </TableContainer>

  )
}

RekomTargetTable.propTypes = {
    header: PropTypes.array.isRequired,
    targetList: PropTypes.array.isRequired,
    updateTargetHandler: PropTypes.func.isRequired,
    createNewTargetHandler: PropTypes.func.isRequired,
    deleteTarget: PropTypes.func.isRequired,
}

export default RekomTargetTable
