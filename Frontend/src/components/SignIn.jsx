import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/userSlice.js';
import { useDispatch } from 'react-redux';
import axios from 'axios'
import {errorParser} from '../utils/errorParser.js'
import {ErrorMsg} from './index.js';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
export default function SignIn({ role = "user" }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error,setError] = React.useState("")
    const backendURL = import.meta.env.BACKEND_URL

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("")
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        const payload = {
            email: data.get('email'),
            password: data.get('password'),
            role: role
        }
        try {
            const res = await axios.post(`${backendURL}/user/login`, payload)
            console.log(res.data.data.data)
            dispatch(login(res.data.data.data))
            navigate('/')

        } catch (error) {
            const errorMsg = errorParser(error)
            console.log("Error ",errorMsg)
            setError(errorMsg)
        }
    };


    return (
        <div className=' mt-24'>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {role} Sign in
                        </Typography>
                        {
                            error && <ErrorMsg msg={error} />
                        }
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
                                    {/* TODO: Write code for forget password */}
                                </Grid>
                                <Grid item>
                                    <Link href={`/${role}signup`} variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
                </Container>
            </ThemeProvider>
        </div>
    );
}