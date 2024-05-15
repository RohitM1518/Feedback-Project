import { Avatar, Typography,Card, CardContent } from '@mui/material'
import React from 'react'

const FeedbackCard = ({fullName,avatar="",comments,type,ratings}) => {
  return (
    <Card sx={{
        bgcolor:'Background.paper',
        padding:'10px'
    }}>
        <div className=' flex gap-2'>
        <Avatar src={avatar}/>
        <Typography variant='h6'>{fullName}</Typography>
        </div>
        <Typography variant='h6' align='center'>
           <b> {type+' Feedback'}</b>
        </Typography>
        <CardContent variant='p' align='center'>{comments}</CardContent>
    </Card>
  )
}

export default FeedbackCard