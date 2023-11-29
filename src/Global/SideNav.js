
import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import SweetAlert from 'sweetalert2-react-content';

const SideNav = () => {

    const handlePress = () => {
        Swal.fire({
            icon: 'info',
            title: 'Contact Information',
            html: '<b>Name:</b> Julian James<br/><b>Phone Number:</b> 0123456789',
            confirmButtonText: 'Close',
        })
    };

    const handleSignOut = () => {
        Swal.fire({
            title: 'Are you sure you want to sign out?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, sign me out!'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/landing-page');
            }
        });
    };

    const handleorders = () => {
        navigate('/orderhistrory')

    };

    const handlefavorites = () => {

        navigate('/termsandconditions')
    }

    const handleterms = () => {
        navigate('/termsandconditions')
    }

    const handlepolicy = () => {
        navigate('/privacypolicy')
    }


    return (
        <Box display="flex" justifyContent="flex-start" alignItems="center" height="100vh"  >

            <Paper elevation={3} style={{ padding: 20, height: '650px', width: '300px', marginTop: '-10px', }} >
                <Box>

                    <Typography sx={{ fontWeight: 'bolder', textAlign: 'center', }}>SARAH</Typography>
                    <Typography sx={{ fontWeight: 'bolder', fontSize: 'smaller', textAlign: 'center' }}>0123456789</Typography>
                    <Typography sx={{ fontWeight: 'bolder', fontSize: 'small', textAlign: 'center' }}>example@gmail.com</Typography>
                </Box>

                <Box>
                    <Typography sx={{ textAlign: 'center' }}>
                        123 Vilakazi Street, Orlando West
                        Soweto, 1804, South Africa
                    </Typography>
                </Box>

                <Box style={{ marginTop: 20 }}>
                    <Ionicons name="ios-timer-outline" size={15} color="gray" />
                    <Button style={{ marginLeft: 5, color: 'gray' }} onClick={{ handleorders }}>Order Histrory</Button>
                </Box>


                <Box>
                    <Ionicons name="ios-timer-outline" size={15} color="gray" />
                    <Button style={{ marginLeft: 5, color: 'gray' }} onClick={{ handlefavorites }}>Favorites</Button>
                </Box>

                <Box>
                    <Ionicons name="ios-timer-outline" size={15} color="gray" />
                    <Button style={{ marginLeft: 5, color: 'gray' }} onClick={{ handleterms }} > Terms and conditions</Button>
                </Box>

                <Box>
                    <Ionicons name="ios-timer-outline" size={15} color="gray" />
                    <Button style={{ marginLeft: 5, color: 'gray' }} onClick={{ handlepolicy }}> Privacy Policy</Button>
                </Box>

                <Box sx={{ marginTop: '40px', backgroundColor: 'rgba(266, 255, 255, 0.9)', textAlign: 'center' }} >
                    <Button sx={{ fontWeight: "bolder", color: 'black' }} onClick={handlePress}>Julian James</Button>
                    <Button sx={{ color: 'gray' }}>Alternative Contact</Button>
                </Box>

                <Box>
                    <Button sx={{ marginTop: '30px', color: 'red' }} onClick={handleSignOut} >SIGNOUT</Button>
                </Box>

            </Paper>
        </Box>
    );
};

export default SideNav;
