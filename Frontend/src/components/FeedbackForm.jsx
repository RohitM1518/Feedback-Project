import { CssBaseline, TextField, Typography } from '@mui/material'
import React from 'react'
import { Card, Button,Box,Rating } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import { useSelector } from 'react-redux';
import axios from 'axios';

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

  const accessToken = useSelector(state => state.currentUser?.accessToken)
  
  const handleSubmit=async (event) => {
    event.preventDefault()
    const payload={
      type:type,
      rating:value,
      comments:comments
    }
    console.log("Payload",payload)
      const res = await axios.post('http://localhost:8000/feedback/create',
        payload,
        {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      console.log("Response ",res.data)
    }
  return (
    <>
      <CssBaseline />
      <div className=' flex flex-col gap-14'>
        <Typography variant='h4' align='center'>{type || " Provide Feedback"}</Typography>
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
            >
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </>
  )
}

export default FeedbackForm