import { TextField, Typography } from '@mui/material'
import React from 'react'

const ErrorMsg = ({msg}) => {
  return (
    <div>
    <Typography variant='p' color='red' align='center'>
        {msg}
    </Typography>
    </div>
  )
}

export default ErrorMsg