import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { TableHead, Alert, Snackbar,MenuItem,InputLabel,FormControl,Select, TableContainer, Table, Typography, TableBody, Avatar, TableRow, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { downloadCSV } from '../utils/downloadFeedbacks';
import {format} from 'timeago.js'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Dashboard = () => {
  const accessToken = useSelector(state => state.currentUser?.accessToken);
  const [feedbacks, setFeedbacks] = useState([]);
  const [open, setOpen] = useState(false);
  const [sortBy, setSortBy] = React.useState('asc');
  const [sortOrder, setSortOrder] = React.useState('createdAt');
  const backendURL = import.meta.env.BACKEND_URL

  const handleSortTypeChange = (event) => {
    setSortBy(event.target.value);
  };
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`${backendURL}/feedback/${id}`, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Corrected template literal syntax
        },
      });
      const updatedFeedbacks = feedbacks.filter(feedback => feedback._id !== id);
      setFeedbacks(updatedFeedbacks);
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
      }, 5000)
      console.log('deleted successfully')
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    const getSortedFeedbacks = async () => {
      try {
        const res = await axios.get(`${backendURL}/dashboard/getallfeedbacks?sortBy=${sortBy}&sortOrder=${sortOrder}`, {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${accessToken}`, // Corrected template literal syntax
          },
        });
        setFeedbacks(res.data.data);
        console.log("admin feedbacks", res.data.data);
      } catch (error) {
        throw error;
      }
    };
    getSortedFeedbacks();
  }, [accessToken,sortBy,sortOrder]); // Added accessToken as a dependency

  const downloadCSVFile = () => {
    if (feedbacks) {
      downloadCSV(feedbacks)
    }
  }



  return (
    <div className='mt-28 flex flex-col w-full justify-center items-center max-sm:px-6 max-md:px-10 max-lg:px-16 max-xl:px-20 max-2xl:px-48'>
      <Snackbar open={open} autoHideDuration={6000} >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Feedback Deleted Successfully!!!
        </Alert>
      </Snackbar>
      <div>
      <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
      <InputLabel id="demo-select-small-label">Sort By</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={sortBy}
        label="sortBy"
        onChange={handleSortTypeChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value='createdAt'>CreatedAt</MenuItem>
        <MenuItem value='type'>Type</MenuItem>
        <MenuItem value='rating'>Ratings</MenuItem>
      </Select>
    </FormControl>
      <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
      <InputLabel id="demo-select-small-label">Sort Order</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={sortOrder}
        label="sortBy"
        onChange={handleSortOrderChange}
      >
        <MenuItem value="">
        </MenuItem>
        <MenuItem value='asc'>asc</MenuItem>
        <MenuItem value='desc'>desc</MenuItem>
      </Select>
    </FormControl>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell><Typography>Name</Typography></StyledTableCell>
              <StyledTableCell><Typography>Ratings</Typography></StyledTableCell>
              <StyledTableCell><Typography>Comments</Typography></StyledTableCell>
              <StyledTableCell><Typography>Type</Typography></StyledTableCell>
              <StyledTableCell><Typography>Submitted</Typography></StyledTableCell>
              <StyledTableCell><Button variant='contained' onClick={downloadCSVFile}>Export as Csv</Button></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {feedbacks && feedbacks.map((feedback, index) => (
              // Corrected the map function to return JSX elements properly
              <StyledTableRow key={index} sx={{ marginTop: '10px' }}>
                <StyledTableCell><Avatar src={feedback.avatar} /></StyledTableCell>
                <StyledTableCell><Typography>{feedback.fullName}</Typography></StyledTableCell>
                <StyledTableCell><Typography>{feedback.rating}</Typography></StyledTableCell>
                <StyledTableCell><Typography>{feedback.comments}</Typography></StyledTableCell>
                <StyledTableCell><Typography>{feedback.type}</Typography></StyledTableCell>
                <StyledTableCell><Typography>{format(feedback.createdAt)}</Typography></StyledTableCell>
                <StyledTableCell onClick={() => { deleteFeedback(feedback._id) }}><DeleteForeverIcon style={{ cursor: 'pointer' }} /></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dashboard;