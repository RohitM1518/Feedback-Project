import { CssBaseline, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Card, Button,Box,Rating,Snackbar } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { errorParser } from '../utils/errorParser';
import ErrorMsg from './ErrorMsg';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const FeedbackForm = ({ type }) => {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [comments, setComments] = React.useState("");
  const status = useDispatch(state => state.currentUser.status)
  const [error, setError] = React.useState("")
  const [feedbackStatus,setFeedbackStatus]= React.useState('Submit')
  const backendURL = import.meta.env.VITE_BACKEND_URL
  const accessToken = useSelector(state => state.currentUser?.accessToken)
  
  const handleSubmit=async (event) => {
    setError('')
    try {
      event.preventDefault()
      const payload={
        type:type,
        rating:value,
        comments:comments
      }
      console.log("Payload",payload)
        const res = await axios.post(`${backendURL}/feedback/create`,
          payload,
          {
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          }
        );
        if(res){
          setFeedbackStatus("Submitted")
        }
        setTimeout(()=>{
          setFeedbackStatus("Submit")
        },5000)
        console.log("Response ",res.data)
    } catch (error) {
      const errorMsg = errorParser(error)
      setError(errorMsg)
    }
    }

    const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      {!status && <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Please Sign In or Sign Up to provide feedback"
      />}
      <div className=' flex flex-col gap-14'>
        <Typography variant='h4' align='center'>{type+" Feedback" || " Provide Feedback"}</Typography>
        <Card>
          <form method="post" className=' p-4' onSubmit={handleSubmit}>
          <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="comments"
              label="Comments"
              name="comments"
              autoComplete="comments"
              autoFocus
              multiline 
              rows={4} 
              onChange={event => setComments(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={status?(handleClick):(()=>{return})}
              color={feedbackStatus=='Submitted'? 'success' : 'primary'}
            >
              {feedbackStatus}
            </Button>
            {
              error && <ErrorMsg msg={error} />
            }
          </form>
        </Card>
      </div>
    </>
  )
}

export default FeedbackForm