import React from 'react'
import { Avatar, Card, Table, TableBody, TableContainer,  Typography } from '@mui/material'

const AdminFeedbackCard = ({fullName="",avatar="",comments="",type="",ratings=""}) => {

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  return (
    // <div className=' flex gap-4 w-full'>
    //     
    //     
    //     
    //    
    //     
    // </div>
    <TableContainer>
      <Table >
        <TableBody>
        <StyledTableCell><Avatar src={avatar} /></StyledTableCell>
          <StyledTableCell><Typography>{fullName}</Typography></StyledTableCell>
          <StyledTableCell><Typography>{ratings}</Typography></StyledTableCell>
          {/* <StyledTableCell> <Typography>{comments}</Typography></StyledTableCell> */}
          <StyledTableCell><Typography>{type}</Typography></StyledTableCell>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdminFeedbackCard