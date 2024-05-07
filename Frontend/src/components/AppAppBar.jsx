import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { UserProfile } from '../components/index.js'

const logoStyle = {
    width: '140px',
    height: 'auto',
    cursor: 'pointer',
};

function AppAppBar() {
    const [open, setOpen] = React.useState(false);
    const isLogin = useSelector(state => state.status)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:3000/user/logout')
            dispatch(logout())
            navigate('/')

        } catch (error) {

        }
    }


    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const scrollToSection = (sectionId) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 128;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({ behavior: 'smooth' });
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth',
            });
            setOpen(false);
        }
    };

    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 2,
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        variant="regular"
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '999px',
                            bgcolor:
                                theme.palette.mode === 'light'
                                    ? 'rgba(255, 255, 255, 0.4)'
                                    : 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(24px)',
                            maxHeight: 40,
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow:
                                theme.palette.mode === 'light'
                                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                    : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                        })}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                ml: '-18px',
                                px: 0,
                            }}
                        >
                            <div className=' px-5'>
                                <Typography variant='h5' color='#093170'>
                                    EchoCollect
                                </Typography>
                            </div>
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <MenuItem
                                    onClick={() => scrollToSection('features')}
                                    sx={{ py: '6px', px: '12px' }}
                                >
                                    <Link to={`/`}>
                                        <Typography variant="body2" color="text.primary">
                                            Home
                                        </Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => scrollToSection('testimonials')}
                                    sx={{ py: '6px', px: '12px' }}
                                >
                                    <Typography variant="body2" color="text.primary">
                                        Product Feedback
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => scrollToSection('highlights')}
                                    sx={{ py: '6px', px: '12px' }}
                                >
                                    <Typography variant="body2" color="text.primary">
                                        Student Feedback
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => scrollToSection('pricing')}
                                    sx={{ py: '6px', px: '12px' }}
                                >
                                    <Typography variant="body2" color="text.primary">
                                        Employee Feedback
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => scrollToSection('faq')}
                                    sx={{ py: '6px', px: '12px' }}
                                >
                                    <Typography variant="body2" color="text.primary">
                                        Contact Us
                                    </Typography>
                                </MenuItem>
                            </Box>
                        </Box>
                         
                            <Box
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    gap: 0.5,
                                    alignItems: 'center',
                                }}
                            >
                                { !isLogin &&
                                <Button
                                    color="primary"
                                    variant="text"
                                    size="small"
                                    component="a"
                                    href="/signin"
                                >
                                    Sign in
                                </Button>
                                }
                                { !isLogin &&
                                <Button
                                    color="primary"
                                    variant="contained"
                                    size="small"
                                    component="a"
                                    href="/signup"
                                >
                                    Sign up
                                </Button>
                                }
                                {
                                    isLogin &&
                                    <div>
                                        <UserProfile />
                                    </div>
                                }
                            </Box>

                        <Box sx={{ display: { sm: '', md: 'none' } }}>
                            <Button
                                variant="text"
                                color="primary"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                                sx={{ minWidth: '30px', p: '4px' }}
                            >
                                <MenuIcon />
                            </Button>
                            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                                <Box
                                    sx={{
                                        minWidth: '60dvw',
                                        p: 2,
                                        backgroundColor: 'background.paper',
                                        flexGrow: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'end',
                                            flexGrow: 1,
                                        }}
                                    >
                                        {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}
                                    </Box>
                                    {
                                        isLogin &&
                                        <div className=' float-right block'>
                                        <UserProfile />
                                        </div>
                                    }   
                                    <Link to={`/`} className=' block'>
                                        <MenuItem onClick={() => scrollToSection('features')}>
                                            Home
                                        </MenuItem>
                                    </Link>
                                    <MenuItem onClick={() => scrollToSection('testimonials')}>
                                        Product Feedback
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection('highlights')}>
                                        Student Feedback
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection('pricing')}>
                                        Employee Feedback
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection('faq')}>Contact Us</MenuItem>
                                    <Divider />
                                    {!isLogin && <>
                                        <MenuItem>
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                component="a"
                                                href="/signup"
                                                sx={{ width: '100%' }}
                                            >
                                                Sign up
                                            </Button>
                                        </MenuItem>
                                        <MenuItem>
                                            <Button
                                                color="primary"
                                                variant="outlined"
                                                component="a"
                                                href="/signin"
                                                sx={{ width: '100%' }}
                                            >
                                                Sign in
                                            </Button>
                                        </MenuItem>
                                    </>}
                                </Box>
                            </Drawer>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

AppAppBar.propTypes = {
    mode: PropTypes.oneOf(['dark', 'light']).isRequired,
    toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;