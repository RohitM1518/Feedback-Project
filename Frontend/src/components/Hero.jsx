import * as React from 'react';
import { alpha } from '@mui/material';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DropDownButton,FeedbackCard } from './index.js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Typewriter from 'typewriter-effect';

export default function Hero() {
    const role = useSelector(state => state.currentUser?.user?.role)
    const user = useSelector(state => state.currentUser?.user)
    const accessToken = useSelector(state => state.currentUser?.accessToken)
    const [feedbacks, setFeedbacks] = React.useState([])
    const backendURL = import.meta.env.BACKEND_URL

    React.useEffect(() => {
        const getUserFeedbacks = async () => {
            try {

                const res = await axios.get(`${backendURL}/feedback/getuserfeedbacks`, {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
                );
                setFeedbacks(res?.data?.data)
                console.log("Feedback data", res?.data?.data)
            } catch (error) {
                throw error
            }
        };
        getUserFeedbacks()
    }, [])
    return (
        <Box
            id="hero"
            sx={(theme) => ({
                width: '100%',
                backgroundImage:
                    theme.palette.mode === 'light'
                        ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                        : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
                backgroundSize: '100% 20%',
                backgroundRepeat: 'no-repeat',
            })}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: { xs: 14, sm: 20 },
                    pb: { xs: 8, sm: 12 },
                }}
            >
                <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
                    <Typography
                        variant="h2"
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignSelf: 'center',
                            textAlign: 'center',
                            fontSize: 'clamp(3.5rem, 10vw, 4rem)',
                        }}
                    >
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter.typeString('Your Voice')
                                    .pauseFor(2)
                                    .start();
                            }}
                        />
                    </Typography>
                    <Typography
                        component="span"
                        variant="h2"
                        sx={{
                            textAlign: 'center',
                            fontSize: 'clamp(3rem, 10vw, 4rem)',
                            color: (theme) =>
                                theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                        }}
                    >

                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter.typeString('Our Improvement')
                                    .pauseFor(2)
                                    .start();
                            }}
                        />

                    </Typography>
                    <Typography
                        textAlign="center"
                        color="text.secondary"
                        sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
                    >
                        Give us your insights and help us deliver better products and services.
                    </Typography>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        alignSelf="center"
                        spacing={1}
                        useFlexGap
                        sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
                    >
                        {role != "admin" ?
                            (<DropDownButton variant='contained' mainBtn='Provide Feedback' btn1='Product Feedback' btn2='Student Feedback' btn3='Employee Feedback' link1='productfeedback' link2='studentfeedback' link3='employeefeedback' />) : (<></>)
                        }
                    </Stack>
                </Stack>
                { user && <Box
                    id="image"
                    sx={(theme) => ({
                        mt: { xs: 8, sm: 10 },
                        alignSelf: 'center',
                        height: { xs: 200, sm: 700 },
                        width: '100%',
                        backgroundImage:
                            theme.palette.mode === 'light'
                                ? 'url("/static/images/templates/templates-images/hero-light.png")'
                                : 'url("/static/images/templates/templates-images/hero-dark.png")',
                        backgroundSize: 'cover',
                        borderRadius: '10px',
                        outline: '1px solid',
                        outlineColor:
                            theme.palette.mode === 'light'
                                ? alpha('#BFCCD9', 0.5)
                                : alpha('#9CCCFC', 0.1),
                        boxShadow:
                            theme.palette.mode === 'light'
                                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                                : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
                    })}
                >
                    <div className='w-full my-10'>
                        <Typography variant='h4' align='center'>Submitted Feedbacks</Typography>
                    </div>
                    <div className=' grid  max-2xl:grid-cols-3 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-6 p-5'>
                        {
                            feedbacks &&
                            feedbacks.map((feedback) => (
                                <div id={feedback._id}>
                                    <FeedbackCard fullName={user?.fullName} avatar={user?.avatar} comments={feedback?.comments} type={feedback?.type} ratings={feedback?.ratings} />
                                </div>
                            ))
                        }
                    </div>
                </Box>
}
            </Container>
        </Box>
    );
}