
import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Paper, Breadcrumbs, Link, Container, Grid } from '@mui/material';
import logo from '../../Global/images/logo.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {

  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    alert('Item added to cart!');
  };

  return (
    <Box>
      {/* Navbar */}
      <Box sx={{ bgcolor: 'common.white', py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Logo" style={{ width: '100px', marginLeft: '20px' }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
          <Link to="/landingscreen"> 
            <Button sx={{ minWidth: '100px', mr: '20px', borderRadius: '40px' }} variant="contained"   color="primary"
              
                
                
                
              
              
            
            >
              Shop
            </Button>
          </Link>


          {/* <Button sx={{ minWidth: '100px', mr: '20px', borderRadius: '40px' }} variant="contained" color="primary"> Shop </Button> */}


          <Button sx={{ minWidth: '150px', mr: '20px' }}>ABOUT US</Button>
          <IconButton aria-label="cart" sx={{ color: 'black' }}>
            <ShoppingCartIcon />
          </IconButton>
          <Typography sx={{ mr: '20px' }}>Welcome Jane</Typography>
        </Box>
      </Box>
      {/* End of Navbar */}

      {/* Paper with Breadcrumbs and Box container */}
      <Box sx={{ mt: 3, px: 2 }}>
        {/* <Paper elevation={3} sx={{ p: 2 }}> */}
        <Breadcrumbs>
          <Link color="inherit" href="/">
            Home
          </Link>
          <Link color="inherit" href="/vaas">
            VAAS
          </Link>
          <Typography color="textPrimary">Digital Marketing Solutions</Typography>
        </Breadcrumbs>
        {/* Container box beneath Breadcrumbs */}
        <Box sx={{ mt: 3 }}>
          <Container fixed>
            <Box sx={{ bgcolor: '#cfe8fc', height: '30vh', width: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '-80px' }}>
              <Typography variant="h6">DMC</Typography>
            </Box>
          </Container>
        </Box>


        <Grid container spacing={2} justifyContent="flex-end" mt={3}>
          <Grid item>
            <Button style={{ borderRadius: '70px', marginTop: '-500px', marginRight: '80px', color: 'black' }}>PHYSICAL</Button>
          </Grid>
        </Grid>

        <Grid>
          <Typography align="center" style={{ marginTop: '-200px', marginLeft: '-320px', fontWeight: 'bold' }}>DIGITAL MARKETING SOLUTIONS</Typography>
        </Grid>

        <Grid>
          <Typography align="center" style={{ marginLeft: '-20px', marginTop: '20px' }} >An in-depth online course covering digital marketing strategies and techniques </Typography>

        </Grid>

        <Grid>
          <Typography align="center" style={{ fontWeight: 'bolder', marginLeft: '-530px', marginTop: '20px' }}>R15OO</Typography>
        </Grid>

        <Grid>
          <Typography align="center" style={{ color: 'gray', marginLeft: '-530px', marginTop: '10px' }}>Quantity</Typography>
        </Grid>


        <Grid container alignItems="flex-end" justifyContent="center" style={{ marginLeft: '-230px' }} spacing={2}>
          <Grid item>
            <Button onClick={handleDecrement} style={{ color: 'black' }}>-</Button>
          </Grid>
          <Grid item>
            <Typography>{count}</Typography>
          </Grid>
          <Grid item>
            <Button onClick={handleIncrement} style={{ color: 'gray' }}>+</Button>
          </Grid>

        </Grid>
        <Grid item>
          <Button variant="contained" style={{ color: 'white', backgroundColor: '#072840', borderRadius: '40px', marginLeft: '790px', marginTop: '-50px' }} onClick={handleAddToCart} >ADD TO CART</Button>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Container fixed>
            <Box sx={{ bgcolor: 'red', height: '20vh', width: '1%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '280px', }}>
            </Box>
          </Container>
        </Box>

        <Grid item>
          <Box>
            <Button variant="contained" style={{}}>Review</Button>
          </Box>
        </Grid>

        {/* </Paper> */}
      </Box>
    </Box>
  );
};

export default Header;
