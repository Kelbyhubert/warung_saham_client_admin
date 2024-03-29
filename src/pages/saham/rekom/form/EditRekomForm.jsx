import { Autocomplete, Box, Button, Grid, Paper, TextField, Toolbar, Typography, debounce } from '@mui/material';
import React from 'react'
import RekomTargetTable from '../../../../components/rekom/RekomTargetTable';
import { useNavigate, useParams } from 'react-router-dom';
import { getRekomDetailById, updateRekom } from '../../../../services/rekom/RekomService';
import { getStockList } from '../../../../services/stock/stockService';
import { useSelector } from 'react-redux';

const dummyTarget = [
    // {targetFrom: 110, targetTo: 200,status: true, order:1},
    // {targetFrom: 110, targetTo: 200,status: false, order:2}
];

const EditRekomForm = () => {

    const user = useSelector(state => state.auth.user);
    const {id} = useParams();

    const header = [
        {id: "index", label: "NO"},
        {id: "target", label: "TARGET"},
        {id: "orders", label: "ORDER"},
        {id: "status", label: "HIT"},
        {id: "action", label: "ACTION"},
    ];

    const navigate = useNavigate();

    const [stockCode,setStockCode] = React.useState("");
    const [entryFrom,setEntryFrom] = React.useState(0);
    const [entryTo,setEntryTo] = React.useState(0);
    const [stopLoss,setStopLoss] = React.useState(0);
    const [desc,setDesc] = React.useState("");
    const [targets, setTargets] = React.useState(dummyTarget);

    const [stockList,setStockList] = React.useState([]);
    const [inputValue, setInputValue] = React.useState('');

    //pelajari useMemo , masih banyak yang binggung
    const fetch = React.useMemo(
        () =>{
            return debounce((e) => {
                const fetchStockList = async () => {
                    const res = await getStockList(e.input);
                    if(res.status === 200){
                        setStockList(res.data);
                        if(e.isInitial) setStockCode(res.data[0]);
                    }else{
                        setStockList([]);
                        if(e.isInitial) setStockCode("");
                    }
                }
                
                fetchStockList();
    
              }
              , 400) 
        },
        [],
    );
    
    //stockCode
    const stockCodeInputHandler = (newValue) => {
        setStockList(newValue ? [newValue, ...stockList] : stockList);
        setStockCode(newValue);
    }

    //entry from 
    const entryFromInputHandler = (value) => {
        setEntryFrom(value);
    }

    //entry to
    const entryToInputHandler = (value) => {
        setEntryTo(value);
    }

    //desc 
    const descInputHandler = (value) => {
        setDesc(value);
    }

    const stopLossInputHandler = (value) => {
        setStopLoss(value);
    }

    const createNewTargetHandler = (newTarget) => {
        setTargets([...targets,newTarget]);
    }


    const updateTargetHandler = (updateTarget) => {
        const updatedTargets = targets.map((data,index) => {
            if(updateTarget.index === index){
                return {
                    id: data.id ? data.id : null,
                    targetFrom: updateTarget.targetFrom,
                    targetTo: updateTarget.targetTo, 
                    status: updateTarget.status, 
                    order: updateTarget.order
                }
            }else{
                return data;
            }
        })

        setTargets(updatedTargets);
    }

    const deleteTarget = (index) => {
        const updatedTargets = targets.filter((_,i) => index !== i)
        setTargets(updatedTargets);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(user.username);
        const newRekom = {
            createBy: user.username,
            rekomCode: stockCode.stockCode,
            targetList: targets,
            description: desc,
            rekomDate: new Date(),
            entryFrom: entryFrom,
            entryTo: entryTo,
            stopLoss: stopLoss,
            rekomType: "DayTrade"
        }

        const res = await updateRekom(id,newRekom);
        
        if(res.status === 200){
            return navigate("/saham/rekom");
        }else{
            console.error("something wrong");
        }
    }

    React.useEffect(() => {
        const fetchRekom = async () => {
            const res = await getRekomDetailById(id);
    
            if(res.status === 200){
               const rekomData = res.data.data;
                fetch({ input: rekomData.kodeSaham , isInitial: true });
                setDesc(rekomData.description);
                setEntryFrom(rekomData.entryFrom);
                setEntryTo(rekomData.entryTo);
                setStopLoss(rekomData.stopLoss);
                setTargets(rekomData.target);
            }else{
              return navigate("rekom/not-found",{replace: true})
            }
        }
        
        fetchRekom();
    },[]);

    React.useEffect(() => {
        if (inputValue === '') {
          setStockList(stockCode ? [stockCode] : []);
          return undefined;
        }
        
        fetch({ input: inputValue , isInitial: false });
    
    },[stockCode, inputValue, fetch])

  return (
    <Box>
        <Toolbar>
            <Box>
                <Typography variant='h4'>Edit Rekom</Typography>
            </Box>
        </Toolbar>
        <Paper component="form" onSubmit={submitHandler}>
            <Grid container spacing={2} padding={4}>
                <Grid item xs={1.5} display='flex' alignItems='center'>
                    <Typography>Stock Code</Typography>
                </Grid>
                <Grid item xs={10.5} display='flex' alignItems='center'>
                    <Autocomplete
                        id="stockCode"
                        sx={{ width: 300 }}
                        filterOptions={(x) => x}
                        options={stockList}
                        autoComplete
                        includeInputInList
                        filterSelectedOptions
                        value={stockCode}
                        noOptionsText={"No Stock"}
                        getOptionLabel={(option) => option.stockCode ? option.stockCode : ""}
                        onChange={(event, newValue) => {
                            stockCodeInputHandler(newValue);
                          }}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        renderInput={(params) => (
                            <TextField {...params} hiddenLabel fullWidth />
                        )}
                    />
                </Grid>
                

                <Grid item xs={1.5} display='flex' alignItems='center'>
                    <Typography>Entry</Typography>
                </Grid>
                <Grid item xs={10.5} display='flex' alignItems='center'>
                    <Box display='flex' alignItems='center'>
                        <TextField value={entryFrom} onChange={e => entryFromInputHandler(e.target.value)} type='number' size='small' sx={{minWidth: 250}}/>
                        <p>-</p> 
                        <TextField value={entryTo} onChange={e => entryToInputHandler(e.target.value)} type='number' size='small' sx={{minWidth: 250}}/>
                    </Box>
                </Grid>
                
                <Grid item xs={1.5} display='flex' alignItems='center'>
                    <Typography>Stop Loss</Typography>
                </Grid>
                <Grid item xs={10.5} display='flex' alignItems='center'>
                    <TextField value={stopLoss} onChange={e => stopLossInputHandler(e.target.value)} type='number' size='small' sx={{minWidth: 250}} />
                </Grid>

                <Grid item xs={1.5} display='flex' alignItems='center'>
                    <Typography>Description</Typography>
                </Grid>
                <Grid item xs={10.5} display='flex' alignItems='center'>
                    <TextField value={desc} onChange={e => descInputHandler(e.target.value)} multiline fullWidth rows={4}/>
                </Grid>

                <Grid container spacing={2} padding={2} marginY={2}>
                    <Grid item xs={12} display='flex' alignItems='center'>
                        <Typography>Target</Typography>
                    </Grid>
                    <Grid item xs={12} display='flex' alignItems='center'>
                        <RekomTargetTable header={header} targetList={targets} updateTargetHandler={updateTargetHandler} deleteTarget={deleteTarget} createNewTargetHandler={createNewTargetHandler}/>
                    </Grid>
                </Grid>
                <Grid item xs={8}/>
                <Grid item xs={2}>
                    <Button onClick={() => navigate("/saham/rekom")} variant='contained' color='secondary' fullWidth>
                    Back
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button type='submit' variant='contained' color='secondary' fullWidth>
                        SAVE
                    </Button>
                </Grid>  
            </Grid>
        </Paper>
    </Box>
  )
}

export default EditRekomForm;
