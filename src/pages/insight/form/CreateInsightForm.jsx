import React from 'react'
import { Box, Button, Grid, Paper, TextField, Toolbar, Typography } from '@mui/material'
import RichTextEditor from '../../../components/custom/richtexteditor/RichTextEditor';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createInsight } from '../../../services/Insight/InsightService';


const CreateInsightForm = () => {

    const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate();
    
    const [title,setTitle] = React.useState('');
    const [thumbnail,setThumbnail] = React.useState('');
    const [contentValue, setContentValue] = React.useState('');
 
    const imgUploadHandler = (event) => {
        const file = event.target.files[0];
        let reader = new FileReader();

        if(file.type !== 'image/png' && file.type !== 'image/jpeg'){
            event.target.value = null;
            setThumbnail('');
            return;
        }

        reader.onload = (e) => {
            let image = new Image();
            image.onload = () => {
                let width = image.width;
                let height = image.height;

                if(width !== 445 && height !== 358){
                    event.target.value = null;
                    setThumbnail('');
                }else {
                    setThumbnail(file);
                }
            }
            image.src = e.target.result;

        }

        reader.readAsDataURL(file);

    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const insightData = {
            title: title,
            thumbnail: thumbnail,
            content: contentValue
        }

        const res = await createInsight(user.userId, insightData);

        if(res.status === 201){
            navigate("/insight");
        }else{
            console.log("something wrong");
        }

    }


  return (
    <Box>
        <Toolbar>
            <Typography variant="h4">Create Insight</Typography>
        </Toolbar>
        <Paper component='form' onSubmit={submitHandler}>
        <Grid container spacing={2} padding={4}>
                <Grid item xs={1.5} display='flex' alignItems='center'>
                    <Typography>Title</Typography>
                </Grid>
                <Grid item xs={10.5} display='flex' alignItems='center'>
                    <TextField type='text' size='small' value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
                </Grid>
                <Grid item xs={1.5} display='flex' alignItems='center'>
                    <Typography>Thumbnail</Typography>
                </Grid>
                <Grid item xs={10.5} display='flex' alignItems='center'>
                    <TextField type='file' size='small' onChange={imgUploadHandler} sx={{minWidth: 250}} />
                </Grid>
                
                <Grid item xs={12} display='flex' alignItems='center'>
                    <Typography>Content</Typography>
                </Grid>
                <Grid item xs={12} display='flex' alignItems='center'>
                    <RichTextEditor onChangeContent={(e) => setContentValue(e)} value={contentValue}/>
                </Grid>
                <Grid item xs={12} display='flex' alignItems='center' justifyContent='flex-end'>
                    <Button onClick={() => navigate("/insight")} variant='contained' color='secondary' style={{width: '10rem', marginLeft: '2rem'}}>
                        Back
                    </Button>
                    <Button type='submit' variant='contained' color='secondary' style={{width: '10rem', marginLeft: '2rem'}}>
                        CREATE
                    </Button>
                </Grid>  
            </Grid>
        </Paper>
    </Box>
  )
}

export default CreateInsightForm
