import { Box, IconButton, Typography, Stack, Button, Modal, TextField } from "@mui/material";
import FeedbackIcon from '@mui/icons-material/Feedback';
import CloseIcon from '@mui/icons-material/Close';
import { useState} from "react";

export default function FeedbackModal({open, handleClose, chatId, updateChat}){
    const [input, setInput] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault();
        updateChat((prev)=>{
            const updated = prev.map((ele)=>{
                if(ele.id===chatId){
                    return {...ele, feedback: input}
                }
                else{
                    return {...ele}
                }
            })
            console.log(updated, prev);
            return updated
        });
        setInput('');
        handleClose();
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx = {{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '95%',
                    bgcolor: 'primary.bgtheme',
                    boxShadow: 24,
                    p: { xs: 2, md: 3 },
                    maxWidth: 720,
                    borderRadius: '10px'
                }}
            >
                <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} spacing={{ xs: .5, md: 2 }} alignItems={'center'}>
                        <FeedbackIcon />
                        <Typography variant={'heading'} fontSize={{ xs: 14, md: 18 }}>
                            Provide Additional Feedback
                        </Typography>
                    </Stack>

                    <IconButton onClick={handleClose} >
                        <CloseIcon />
                    </IconButton>
                </Stack>

                <Box
                    component='form'
                    pt={3}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: "flex-end",
                        gap: '12px'
                    }}
                    onSubmit={handleSubmit}
                >
                    <TextField
                        multiline
                        rows={6}
                        sx={{ width: 1 }}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        required
                    />
                    <Button
                        variant='contained'
                        type='submit'
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    )}