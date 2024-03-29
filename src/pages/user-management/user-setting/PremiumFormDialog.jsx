import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { getAllPlan } from '../../../services/plan/PlanService';
import { createUserPremium } from '../../../services/User/UserService';
import { useParams } from 'react-router-dom';


const paymentTypeList = [
    "BCA Transfer", 
    "Transfer Antar Bank"
];

const PremiumFormDialog = (props) => {

    const {userId} = useParams();

    const [plan, setPlan] = React.useState('');
    const [img, setImg] = React.useState('');
    const [paymentType, setPaymentType] = React.useState('');

    const [planList, setPlanList] = useState([]);

    const planInputHandler = (e) => {
        setPlan(e.target.value);
    }

    const paymentTypeInputHandler = (e) => {
        setPaymentType(e.target.value);
    }

    const imgUploadHandler = (e) => {
        setImg(e.target.files[0]);
    }

    const closeHandler = () => {
        setPlan('');
        setImg('');
        setPaymentType('');
        props.handleDialog(false);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPremium = {
            planId: plan.id,
            img,
            paymentType
        }
        await createUserPremium(userId, newPremium);
        closeHandler();
    }

    React.useEffect(() => {
        const getPlanList = async () => {
            const res = await getAllPlan();
            setPlanList(res.data.data);
        }
        getPlanList();
        
    },[]);

  return (
    <Dialog 
        open={props.open}
        onClose={closeHandler}
        PaperProps={{
            component: 'form',
            onSubmit : submitHandler
        }}
        fullWidth
    >
        <DialogTitle sx={{ m: 0, p: 2 }}>Add Premium</DialogTitle>
        <DialogContent >
            <Box sx={{paddingTop: 2}}>
                <InputLabel shrink={true} id="planId">Plan</InputLabel>
                <Select 
                    fullWidth 
                    labelId='planId' 
                    value={plan} 
                    onChange={planInputHandler}
                >
                    {planList.map((data) => (
                        <MenuItem key={data.id} value={data}>
                            {data.planName}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            <Box sx={{paddingTop: 2}}>
                <InputLabel shrink={true} id="paymentTypeId">Payment Type</InputLabel>
                <Select 
                    fullWidth 
                    labelId='paymentTypeId' 
                    value={paymentType} 
                    onChange={paymentTypeInputHandler}
                >
                    {paymentTypeList.map((value,index) => (
                        <MenuItem key={index} value={value}>
                            {value}
                        </MenuItem>
                    ))}    
                </Select>
            </Box>


            <Box sx={{paddingTop: 2}}>
                <InputLabel shrink={true} id="imgId">Evidence</InputLabel>
                <TextField type='file' labelId="imgId" hiddenLabel onChange={imgUploadHandler} fullWidth/>
            </Box>

        </DialogContent>
        <DialogActions>
            <Button variant='contained' fullWidth onClick={closeHandler}>Cancel</Button>
            <Button variant='contained' fullWidth type='submit'>Add</Button>
        </DialogActions>
    </Dialog>
  )
}

PremiumFormDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleDialog: PropTypes.func.isRequired,
}

export default PremiumFormDialog
