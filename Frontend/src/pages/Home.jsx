import * as React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import {Box} from '@mui/material';
import Hero from '../components/Hero';
import Footer from '../components/AppAppBar';

export default function LandingPage() {
  
  return (
    <div>
      <CssBaseline />
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Footer />
      </Box>
   </div>
  );
}